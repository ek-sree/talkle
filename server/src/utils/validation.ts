
/**
 * Validate email format
 * @param email - The email string to validate
 * @returns true if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - The password string to validate
 * @returns true if valid, false otherwise
 */
export const validatePassword = (password: string): boolean => {
    // Minimum 8 characters, at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};


/**
 * Validate OTP format
 * @param otp - The OTP string to validate
 * @returns true if valid, false otherwise
 */
export const validateOtp = (otp: string): boolean => {
    // Ensure the OTP is exactly 4 digits (adjust length if needed)
    const otpRegex = /^\d{4}$/;
    return otpRegex.test(otp);
};


/**
 * Validate phone number format
 * @param phoneNumber - The phone number string to validate
 * @returns true if valid, false otherwise
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Match international or local phone number formats
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phoneNumber);
};

/**
 * Validate userId format (e.g., MongoDB ObjectId)
 * @param userId - The userId string to validate
 * @returns true if valid, false otherwise
 */
export const validateUserId = (userId: string): boolean => {
    // Match MongoDB ObjectId (24 hexadecimal characters)
    const objectIdRegex = /^[a-f\d]{24}$/i;
    return objectIdRegex.test(userId);
};



/**
 * Validate username
 * - Restricts spaces and emojis
 * - Allows underscores, special characters, letters, and numbers
 * @param userName - The username string to validate
 * @returns true if valid, false otherwise
 */
export const validateUserName = (userName: string): boolean => {
    // Regex Explanation:
    // ^ - Start of string
    // [^\s\u1F600-\u1F64F\u2600-\u26FF\u2700-\u27BF]* - Excludes spaces and emoji ranges
    // $ - End of string
    const userNameRegex = /^[^\s\u{1F600}-\u{1F64F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]*$/u;
    return userNameRegex.test(userName);
};




/**
 * Validate name
 * - Checks if the name is not empty after trimming
 * @param name - The name string to validate
 * @returns true if valid (non-empty), false otherwise
 */
export const validateName = (name: string): boolean => {
    return name.trim().length > 0;
};
