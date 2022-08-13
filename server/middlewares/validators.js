import { body } from 'express-validator';
import { MESSAGE, FIELD } from '../helpers/constants';
import AuthController from '../controllers/authController';
/**
 * Used with express validator to validate input paramters
 * @export
 * @class Validator
 */
export default class Validator {
  /**
   * Validates registration/signup parameters
   * @static
   * @returns {array} The array of express validator chains
   * @memberof Validator
   */
  static validateRegistration() {
    return [
      ...Validator.validateFirstName(),
      ...Validator.validatelastName(),
      ...Validator.validatePassword(),
      ...Validator.verifyPhoneNumberExists(),
    ];
  }

  /**
   * Validates first name
   * @static
   * @returns {array} The array of express validator chains
   * @memberof Validator
   */
  static validateFirstName() {
    return [
      body(FIELD.FIRST_NAME)
        .not().isEmpty()
        .withMessage(MESSAGE.FIRST_NAME_EMPTY)
    ];
  }

  /**
   * Validates first name
   * @static
   * @returns {array} The array of express validator chains
   * @memberof Validator
   */
  static validatelastName() {
    return [
      body(FIELD.LAST_NAME)
        .not().isEmpty()
        .withMessage(MESSAGE.LAST_NAME_EMPTY)
    ];
  }

  /**
   * Verifies that the email exists
   * @static
   * @returns {array} The array of express validator chains
   * @param {boolean} alternate Alternate the response message
   * @memberof Validator
   */
  static verifyPhoneNumberExists(alternate = false) {
    return [
      body(FIELD.PHONE_NUMBER)
        .trim()
        .custom(async (phoneNumber) => {
          const user = await AuthController.getUser('phoneNumber', phoneNumber);
          if (!alternate && user) {
            return Promise.reject(MESSAGE.PHONE_NUMBER_EXISTS);
          }
          if (alternate && !user) {
            return Promise.reject(MESSAGE.PHONE_NUMBER_NOT_EXISTS);
          }
        }),
    ];
  }

  /**
   * Validates password
   * @static
   * @returns {array} The array of express validator chains
   * @memberof Validator
   */
  static validatePassword() {
    return [
      body(FIELD.PASSWORD)
        .not().isEmpty()
        .withMessage(MESSAGE.PASSWORD_EMPTY)
        .isLength({ min: 8 })
        .withMessage(MESSAGE.PASSWORD_TOO_SHORT)
        .matches(/[a-z]/i)
        .withMessage(MESSAGE.PASSWORD_NOT_ALPHANUMERIC)
        .matches(/\d/)
        .withMessage(MESSAGE.PASSWORD_NOT_ALPHANUMERIC),
    ];
  }

  /**
   * Validates email when recovering password
   * @static
   * @returns {array} The array of express validator chains
   * @memberof Validator
   */
  static validateForgotPassword() {
    return [
      ...Validator.validateEmail(),
      ...Validator.verifyEmailExists(true),
    ];
  }

  /**
   * Validate password and confirm_password parameters when reseting a user password
   * @static
   * @memberof Validator
   * @returns {void}
   */
  static validateResetPassword() {
    return [
      body(FIELD.PASSWORD)
        .not().isEmpty()
        .withMessage(MESSAGE.PASSWORD_EMPTY),
      body(FIELD.CONFIRM_PASSWORD)
        .not().isEmpty()
        .withMessage(MESSAGE.CONFIRM_PASSWORD_EMPTY)
        .custom((password, { req }) => {
          if (password !== req.body.password) {
            throw new Error(MESSAGE.PASSWORD_NOT_MATCH);
          } else {
            return password;
          }
        }),
    ];
  }
}
