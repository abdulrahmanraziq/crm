import jwt from "jsonwebtoken";
import User from '../models/User.js';

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {

            try {

                if(err) {
                    return res.status(401).json({error: "Unauthorized"});
                }    
                const user = await User.findOne({_id: payload._id}).select("-password");
                req.user = user;
                next();
                
            } catch (error) {

                console.log(err);               
                
            }
        });

    } 
    
    else {
        return res.status(403).json({error: "Forbidden"});
        }
    
}