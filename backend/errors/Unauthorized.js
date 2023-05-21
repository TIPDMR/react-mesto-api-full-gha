class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
