const express = require('express');

const customResponse = Object.create(express().response, {
  ok: {
    value: function(data, message = "") {
      return this.status(200).json({ statusCode: 200, data, message });
    }
  },
  fail: {
    value: function(message, statusCode = 400) {
      return this.status(statusCode).json({ statusCode, message });
    }
  }
});

module.exports = customResponse;