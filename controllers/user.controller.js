const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP ================= */


// got email & pass from frontend
// check in db if user exists with that email
// no - plz regsiter first

// yes  - pas match- compare
// no- authentication failed pass not matching
// yes- send auth token 
 


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Already registered, please login"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/* ================= LOGIN ================= */

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const userRecord = await User.findOne({ email });
        if (!userRecord) {
            return res.status(400).json({
                message: "Please register first"
            });
        }

        // compare password
        const matched = await bcrypt.compare(password, userRecord.password);
        if (!matched) {
            return res.status(400).json({
                message: "Authentication failed: password not matching"
            });
        }

        // generate JWT token
        const authToken = jwt.sign(
            { _id: userRecord._id },
            process.env.JWT_TOKEN,
        );

        return res.status(200).json({
            message: "Authentication successful",
            token: authToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};




// ====================authorization====================
// check for auth token req.header("Authorization")
// bearer authToken .split - no 
// jwt verify-no - response 400  return
// next()
// 
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing or invalid"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded; // {_id: userId}

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

exports.authenticate = authenticate;
