import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { User } from '../user/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { throwError } from '../../decorators/user.decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public static IS_ALLOWED_FOR_ALL_USERS = 'isCreateUserAction';
  public static IS_PUBLIC_PATH = 'isPublic';
  constructor(private reflector: Reflector) {
    super();
  }

  private async _AssignUser(userId: string, context: ExecutionContext) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const isAccountActivated = !!(await user.account).isActivated;
    if (user && !isAccountActivated) {
      throwError(
        `User don't exist or account is not activated`,
        'USER DONT EXIST IN DB OR NOT ACTIVATED',
        'JWT_GUARD',
      );
    }
    context.switchToHttp().getRequest().user = user;
    return true;
  }

  /**
   * we override base can activate fn due to Identity logic
   * and to prevent multiple DB asks,
   * user is from start contained in req object
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * Fetch data from reflector, @Public decorator assigns IS_PUBLIC_PATH = true
     */
    const isPublic = this.reflector.getAllAndOverride(
      JwtAuthGuard.IS_PUBLIC_PATH,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;

    /**
     * Now token is validated
     */
    const isTokenCorrect = await super.canActivate(context);
    console.log(isTokenCorrect, 'tooo');
    /**
     * Then we check if action is mark by @AllowOnlyByToken()
     * if yes, we will skip finding user in db because action authed only by token
     * if not we will search in DB user with id matched with this contained in token
     */
    const isCreateUserAction = this.reflector.getAllAndOverride(
      JwtAuthGuard.IS_ALLOWED_FOR_ALL_USERS,
      [context.getHandler(), context.getClass()],
    );
    console.log(isCreateUserAction, 'tessst');

    if (!isCreateUserAction) {
      const tokenUser = context.switchToHttp().getRequest().user;

      /**
       * our canValidate is async and cannot return Observable,
       * so we have to check if value is Observable then deal with it
       */
      if (isTokenCorrect instanceof Observable) {
        /**
         * we create new promise and resolve it with value from observable
         */
        return new Promise((resolve) => {
          isTokenCorrect.subscribe((value) => {
            /**
             * checks if super.canValidate returned true -> token is correct
             */
            console.log('check');
            if (!value) resolve(value);
            resolve(this._AssignUser(tokenUser.userId, context));
          });
        });
      }

      /**
       * if is not observable
       */
      if (!isTokenCorrect) return isTokenCorrect;
      return this._AssignUser(tokenUser.userId, context);
    }

    /**
     * if operation is CREATE_USER_ACTION we only have to valid token,
     * but our isTokenCorrect still can be observable so we check it,
     * and base on this we return value
     */
    return isTokenCorrect instanceof Observable
      ? new Promise((resolve) =>
          isTokenCorrect.subscribe((value) => resolve(value)),
        )
      : isTokenCorrect;
  }
}
