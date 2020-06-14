const config = {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  jwt_secret_key: process.env.JWT_KEY,
  jwt_token_login_life_time: '1d',
  jwt_token_refresh_life_time: '7d',
  root_project_path: 'libraryapp-api',
  image_static_path: function (req) {
    return `${req.protocol}://${req.get("host")}/${this.root_project_path}/images/`;
  }
};

module.exports = config;
