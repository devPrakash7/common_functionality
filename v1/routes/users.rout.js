var express = require("express");
var router = express.Router();
const { authenticate } = require("../../middleware/authenticate");

const {
  login_validator,
  validation_result,
  update_customer_validator,
  user_validator,
  Verify_otp_validator,
  update_customer_status_validator,
  refresh_token__validator,
} = require("../../validation/user.validator");



const {
  signUp,
  login,
  generate_auth_tokens,
  Otp_Verify,
  logout,
  get_all_customer,
  update_customer_detalis,
  customer_account_actived,
  export_customer_data_into_excel_file,
  customer_file_export_into_csv_file,
  customer_file_export_into_pdf_file,
  
} = require("../controllers/user.controller");
const { upload } = require("../../middleware/multer");

router.post(
  "/signUp",
  upload.single('file'),
  user_validator,
  validation_result,
  signUp
);
router.post("/login", login_validator, validation_result, login);
router.get("/logout", authenticate, logout);
router.post(
  "/otp-verify",
  Verify_otp_validator,
  validation_result,
  authenticate,
  Otp_Verify
);
router.get(
  "/auth_tokens/:refresh_tokens",
  refresh_token__validator,
  validation_result,
  generate_auth_tokens
);
router.get("/List_of_customer", get_all_customer);
router.put(
  "/update_customer_detalis",
  update_customer_validator,
  validation_result,
  authenticate,
  update_customer_detalis
);
router.put(
  "/account_actived",
  update_customer_status_validator,
  validation_result,
  authenticate,
  customer_account_actived
);

router.post("/customer_data_export_excel" , export_customer_data_into_excel_file)
router.post("/customer_data_export_csv" , customer_file_export_into_csv_file)
router.post('/customer_data_export_pdf' , customer_file_export_into_pdf_file)


module.exports = router;