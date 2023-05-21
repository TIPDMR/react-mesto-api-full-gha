class InternalServer extends Error {
  constructor(message) {
    super(message);
    this.name = 'Internal Server Error';
    this.statusCode = 500;
  }
}

module.exports = InternalServer;
