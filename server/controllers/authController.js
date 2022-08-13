import models from '../models';
import Response from '../helpers/responseHelper';
import { STATUS, MESSAGE } from '../helpers/constants';
import logger from '../helpers/logger';
import { generateToken } from '../helpers/utils';

const { User } = models;

/**
 * Class representing users controller
 *
 * @class AuthController
 */
class AuthController {
  /**
   * Creates a new user resource
   *
   * @static
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Function} next - Express next function
   * @returns {void}
   *
   * @memberof AuthController
   */
  static async register(req, res) {
    const { body } = req;

    try {
      const user = await User.create(body);

      const token = await generateToken({ user });

      Response.send(res, STATUS.CREATED, { id: user.id, token }, MESSAGE.REGISTRATION_SUCCESSFUL);
      return;
    } catch (err) {
      logger.log(err);
      return Response.send(res, STATUS.SERVER_ERROR, { error: err }, 'Error occured while signing you up, Please Try Again');
    }
  }

  /**
   * Get a user where the column(param) equals the specified value
   *
   * @static
   * @param {string} param The column to search against (e.g email, id, username)
   * @param {string} value The actual value to test for
   * @returns {object} The user object
   * @memberof AuthController
   */
  static async getUser(param, value) {
    let user;
    try {
      user = await User.findOne({ where: { [param]: value } });
    } catch (err) {
      logger.log(err);
      Response.send(STATUS.NOT_FOUND, { error: err }, MESSAGE.NOT_FOUND);
      return err;
    }
    return user;
  }
}

export default AuthController;
