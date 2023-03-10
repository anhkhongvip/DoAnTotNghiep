import * as jwt from "jsonwebtoken";

const encodedToken = (data : string, secret : string) => {
  return jwt.sign(
    {
      iss: "Dinh Hung",
      sub: data, // là 1 cái gì đó độc nhất ví dụ như id
      iat: new Date().getTime(), //ngày phát hành
    },
    secret
  );
};

const decodedToken = (token : string, secret : string) => jwt.verify(token, secret);

export { encodedToken, decodedToken };
