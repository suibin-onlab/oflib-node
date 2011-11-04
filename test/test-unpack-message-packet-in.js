/*
 * Author: Zoltán Lajos Kis <zoltan.lajos.kis@ericsson.com>
 */

"use strict";

var assert = require('assert');
var util = require('util');
var testutil = require('./testutil.js');
var oflib = require('../lib/oflib.js');

(function() {
    console.log("1. ...");
    var bin = [0x02,                          // version = 2
               0x0a,                          // type = 10
               0x00, 0x1f,                    // length = 31
               0x49, 0x96, 0x02, 0xd2,        // xid = 1234567890
               0x00, 0x00, 0x00, 0x13,        // buffer_id = 19
               0x00, 0x00, 0x00, 0x02,        // in_port = 2
               0x00, 0x00, 0x00, 0x02,        // in_phy_port = 2
               0x04, 0x00,                    // total_len = 1024
               0x01,                          // reason = 1
               0x2a,                          // table_id = 42
               0x00, 0x00,                    // pad (data)
               0x11, 0x22, 0x33, 0x44, 0x55]; // data

    var json = {
            "message" : {"type" : 'OFPT_PACKET_IN', "xid" : 1234567890,
                         "buffer_id" : 19,
                         "in_port" : 2,
                         "total_len" : 1024,
                         "reason" : 'OFPR_ACTION',
                         "table_id" : 42,
                         "data" : "1122334455"},
            "offset" : 31
            };

    var res = oflib.unpackMessage(new Buffer(bin), 0);
    assert(testutil.jsonEqualsStrict(res, json), util.format('Expected %j,\n received %j', json, res));
    console.log("OK.");
}());