## Security Audit Report

### 1. MongoDB Injection
- Vulnerability Found: Login accepts objects like {"email": {"$gt": ""}}
- Fix: Added express-mongo-sanitize middleware

### 2. XSS (Cross-site scripting)
- Vulnerability Found: Inputs are not sanitized
- Fix: Added xss-clean middleware

### 3. Insecure Authentication
- Issue: Passwords stored as plain text
- Fix: Integrated bcrypt to hash and compare passwords

### 4. HTTP Headers
- Headers were missing
- Fix: Used helmet middleware

### 5. Cookie Security
- Used httpOnly, sameSite, and secure flags

### 6. HTTPS
- Recommendation: Use HTTPS in production
