const { type } = require("express/lib/response");
const User = require("../model/User");
const bcrypt = require('bcrypt');


class UserAuth {
        static loginUser = async (data) => {
                try {
                        console.log("In auth.js")
                        console.log(data)
                        const query = {
                                email: data.email,
                        };
                        const foundUser = await User.findOne({ email: query.email });
                        if (foundUser) {
                              
                                console.log("found user")
                        }


                        if (foundUser && foundUser.password === data.password) {
                              
                                return { foundUser };
                        }

                        return null;
                } catch (err) {
                        console.log(err);
                        console.log("Some unexpected error occurred while logging in");
                }
        }
        static getUsers = async () => {
                try {
                        const users = await User.find();
                        if (users?.length > 0) {
                                return users;
                        }
                } catch (err) {
                        console.log(err);
                        console.log("Some unexpected error occurred while fetching users");
                }

        }
}

module.exports.UserAuth = UserAuth;