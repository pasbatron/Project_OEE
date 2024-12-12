[
    {
        "id": "89b70d37f155c18d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2185,
        "y": 1465,
        "wires": [
            [
                "1740ef9416aff463"
            ]
        ]
    },
    {
        "id": "4b3ef5e7fa6aef0c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2200,
        "y": 1510,
        "wires": [
            [
                "ed110bfe8bf72236"
            ]
        ]
    },
    {
        "id": "f1bb939c673f0838",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2190,
        "y": 1570,
        "wires": [
            [
                "67ab2f518d1b3b27"
            ]
        ]
    },
    {
        "id": "dab477238e3d6758",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2190,
        "y": 1630,
        "wires": [
            [
                "48b05bbb742fef75"
            ]
        ]
    },
    {
        "id": "3d88683699f838b1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2200,
        "y": 1690,
        "wires": [
            [
                "b29b5f0b465fbca3"
            ]
        ]
    },
    {
        "id": "4bcd6db454425747",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2190,
        "y": 1755,
        "wires": [
            [
                "f71b1fb73d7e1c26"
            ]
        ]
    },
    {
        "id": "1740ef9416aff463",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2470,
        "y": 1450,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "ed110bfe8bf72236",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2490,
        "y": 1510,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "67ab2f518d1b3b27",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2480,
        "y": 1570,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "48b05bbb742fef75",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2480,
        "y": 1630,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "b29b5f0b465fbca3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2490,
        "y": 1690,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "f71b1fb73d7e1c26",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2480,
        "y": 1750,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "821e9afe0d1f8093",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_mcfault#",
        "payloadType": "str",
        "x": 1455,
        "y": 1275,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "b2e8c13a65e53acc",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_mcfault#",
        "payloadType": "str",
        "x": 1460,
        "y": 1240,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "0c55f85c85ed5526",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1865,
        "y": 1165,
        "wires": [
            [
                "89b70d37f155c18d"
            ]
        ]
    },
    {
        "id": "153f749c829a6976",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 1205,
        "wires": [
            [
                "89b70d37f155c18d"
            ]
        ]
    },
    {
        "id": "5249dbe54312ce1d",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1620,
        "y": 1180,
        "wires": [
            [
                "0c55f85c85ed5526",
                "153f749c829a6976",
                "1f3615dca1d6a631",
                "e2da334b9b9ad5d1",
                "251f4de243f2046b",
                "1cf22645e2c5edb9",
                "370f9013ad15692f",
                "1a22754bce36dd74",
                "4597ae1e5f6e0f07",
                "4ea4bef8339d2e6a",
                "6b26b4b6f336187d",
                "edbd029bcdd75872"
            ]
        ]
    },
    {
        "id": "1f3615dca1d6a631",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_qualitycheck",
        "func": "var data_condition;\ndata_condition = msg.payload;\nif (data_condition == \"iaa35on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1890,
        "y": 1255,
        "wires": [
            [
                "4b3ef5e7fa6aef0c"
            ]
        ]
    },
    {
        "id": "e2da334b9b9ad5d1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1890,
        "y": 1290,
        "wires": [
            [
                "4b3ef5e7fa6aef0c"
            ]
        ]
    },
    {
        "id": "251f4de243f2046b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1890,
        "y": 1340,
        "wires": [
            [
                "f1bb939c673f0838"
            ]
        ]
    },
    {
        "id": "1cf22645e2c5edb9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1890,
        "y": 1375,
        "wires": [
            [
                "f1bb939c673f0838"
            ]
        ]
    },
    {
        "id": "370f9013ad15692f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 1460,
        "wires": [
            [
                "dab477238e3d6758",
                "116e10a65bdabbd5"
            ]
        ]
    },
    {
        "id": "1a22754bce36dd74",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 1495,
        "wires": [
            [
                "dab477238e3d6758",
                "aa1e2b57562f7eff"
            ]
        ]
    },
    {
        "id": "4597ae1e5f6e0f07",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 1545,
        "wires": [
            [
                "3d88683699f838b1",
                "3606ed991b883daa"
            ]
        ]
    },
    {
        "id": "4ea4bef8339d2e6a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 1580,
        "wires": [
            [
                "3d88683699f838b1",
                "d56b69422e67e44c"
            ]
        ]
    },
    {
        "id": "6b26b4b6f336187d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 1630,
        "wires": [
            [
                "4bcd6db454425747",
                "17f54b3bd7ad7e63"
            ]
        ]
    },
    {
        "id": "edbd029bcdd75872",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 1665,
        "wires": [
            [
                "4bcd6db454425747",
                "abc309c06e9c2340"
            ]
        ]
    },
    {
        "id": "bb65c127b5b7a9e7",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "62990f32ac22a85e",
        "name": "",
        "x": 2820,
        "y": 1600,
        "wires": [
            []
        ]
    },
    {
        "id": "085f0f12049af9db",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_toolchange#",
        "payloadType": "str",
        "x": 1460,
        "y": 1365,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "1679aa33b8b5f58e",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_toolchange#",
        "payloadType": "str",
        "x": 1465,
        "y": 1330,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "6f6ddd7f08eb51dc",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_qualitycheck#",
        "payloadType": "str",
        "x": 1465,
        "y": 1455,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "0fe456ce56d58ae6",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_qualitycheck#",
        "payloadType": "str",
        "x": 1470,
        "y": 1420,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "3e8a1163f7d9dd69",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_arm#",
        "payloadType": "str",
        "x": 1455,
        "y": 1545,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "de39bc3a9e387eca",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_arm#",
        "payloadType": "str",
        "x": 1460,
        "y": 1510,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "ba34232d39624ea8",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_roller#",
        "payloadType": "str",
        "x": 1450,
        "y": 1630,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "2a9f356814bb1a6b",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_roller#",
        "payloadType": "str",
        "x": 1455,
        "y": 1595,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "e683c2b9bd8421d6",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_pin#",
        "payloadType": "str",
        "x": 1445,
        "y": 1715,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "6f6230012a172798",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_pin#",
        "payloadType": "str",
        "x": 1450,
        "y": 1680,
        "wires": [
            [
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "0a04f18f8e38b17e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2150,
        "y": 2170,
        "wires": [
            [
                "c88a1ec4e2780ab1"
            ]
        ]
    },
    {
        "id": "ecae2a9fe53d6a0f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2170,
        "y": 2230,
        "wires": [
            [
                "1bb43aaf59c53a0d"
            ]
        ]
    },
    {
        "id": "b376bf90015e130e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2160,
        "y": 2290,
        "wires": [
            [
                "676009eddf0dcee9"
            ]
        ]
    },
    {
        "id": "6137516d41cbac48",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2160,
        "y": 2350,
        "wires": [
            [
                "83e3e31298d8f078"
            ]
        ]
    },
    {
        "id": "96dc9e7dc0bf6ec0",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2175,
        "y": 2420,
        "wires": [
            [
                "aee4f9b3e4fd7228"
            ]
        ]
    },
    {
        "id": "a98d0c70ed6ccd83",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2160,
        "y": 2500,
        "wires": [
            [
                "840bdff2ea553fbe"
            ]
        ]
    },
    {
        "id": "c88a1ec4e2780ab1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2440,
        "y": 2170,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "1bb43aaf59c53a0d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2460,
        "y": 2230,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "676009eddf0dcee9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2450,
        "y": 2290,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "83e3e31298d8f078",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2450,
        "y": 2350,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "aee4f9b3e4fd7228",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2460,
        "y": 2410,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "840bdff2ea553fbe",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2450,
        "y": 2470,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "1783ae375acf7ba3",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1635,
        "y": 1845,
        "wires": [
            [
                "68f2cde65525b7f6",
                "badf25f312d28ef3",
                "e1cfdaca8e7e6336",
                "e56c8509a54c30b7",
                "09845ba021e634c0",
                "c06de27e97aa9a27",
                "2dbbebf60c3dd601",
                "99fd732edeafe369",
                "37156017dcc052ea",
                "1314a44c9b53b6a4",
                "1692643e057d1108",
                "d19ef0be15809903"
            ]
        ]
    },
    {
        "id": "0c016f292decf4dd",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "18c7aa0014d44912",
        "name": "",
        "x": 2770,
        "y": 2295,
        "wires": [
            []
        ]
    },
    {
        "id": "e19f5e69b4f25cef",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2185,
        "y": 3150,
        "wires": [
            [
                "327e83ca7d81e1a4"
            ]
        ]
    },
    {
        "id": "48f7e8fb9de7da3e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2205,
        "y": 3210,
        "wires": [
            [
                "43841f22dd173eca"
            ]
        ]
    },
    {
        "id": "327e83ca7d81e1a4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2475,
        "y": 3150,
        "wires": [
            [
                "dce9a15733bd689a"
            ]
        ]
    },
    {
        "id": "43841f22dd173eca",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2495,
        "y": 3210,
        "wires": [
            [
                "dce9a15733bd689a"
            ]
        ]
    },
    {
        "id": "6fc9e49d68ef3233",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73off_mcfault#",
        "payloadType": "str",
        "x": 1385,
        "y": 2995,
        "wires": [
            [
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "09225f688199dded",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73on_mcfault#",
        "payloadType": "str",
        "x": 1390,
        "y": 2960,
        "wires": [
            [
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "38403a037f6d83ec",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73off_hoppernopart#",
        "payloadType": "str",
        "x": 1400,
        "y": 3085,
        "wires": [
            [
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "9000372a444103ee",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73on_hoppernopart#",
        "payloadType": "str",
        "x": 1405,
        "y": 3050,
        "wires": [
            [
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "dce9a15733bd689a",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 2795,
        "y": 3165,
        "wires": [
            []
        ]
    },
    {
        "id": "4ad793e1c3c9f539",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2190,
        "y": 2780,
        "wires": [
            [
                "211fc4815d29d167"
            ]
        ]
    },
    {
        "id": "8c9ac8fcc055330c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2205,
        "y": 2820,
        "wires": [
            [
                "e15fa44b936f3a5d"
            ]
        ]
    },
    {
        "id": "211fc4815d29d167",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2460,
        "y": 2870,
        "wires": [
            [
                "0c124322e0c63de3"
            ]
        ]
    },
    {
        "id": "e15fa44b936f3a5d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2480,
        "y": 2930,
        "wires": [
            [
                "0c124322e0c63de3"
            ]
        ]
    },
    {
        "id": "88e28ecf9960bd01",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72off_mcfault#",
        "payloadType": "str",
        "x": 1365,
        "y": 2665,
        "wires": [
            [
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "2565c9c08e002f65",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72on_mcfault#",
        "payloadType": "str",
        "x": 1370,
        "y": 2630,
        "wires": [
            [
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "e92a28908eec6bb2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1825,
        "y": 2815,
        "wires": [
            [
                "4ad793e1c3c9f539",
                "24735e8294c229de"
            ]
        ]
    },
    {
        "id": "4e4c3809dc1fae95",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1825,
        "y": 2850,
        "wires": [
            [
                "4ad793e1c3c9f539",
                "3c986d9228ccfc03"
            ]
        ]
    },
    {
        "id": "f1b41ee91929582a",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1615,
        "y": 2880,
        "wires": [
            [
                "e92a28908eec6bb2",
                "4e4c3809dc1fae95",
                "e719363d2482d4c4",
                "da4365d94d1ff698",
                "9f3905100458d398"
            ]
        ]
    },
    {
        "id": "e719363d2482d4c4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1845,
        "y": 2890,
        "wires": [
            [
                "8c9ac8fcc055330c",
                "ef642999de741ff4"
            ]
        ]
    },
    {
        "id": "da4365d94d1ff698",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1845,
        "y": 2930,
        "wires": [
            [
                "8c9ac8fcc055330c",
                "86d2010727a43d82"
            ]
        ]
    },
    {
        "id": "8bd24842da1b886f",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72off_hoppernopart#",
        "payloadType": "str",
        "x": 1380,
        "y": 2755,
        "wires": [
            [
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "1d393eacf2d98896",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72on_hoppernopart#",
        "payloadType": "str",
        "x": 1385,
        "y": 2720,
        "wires": [
            [
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "0c124322e0c63de3",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 2765,
        "y": 2890,
        "wires": [
            []
        ]
    },
    {
        "id": "73f7e665eb7f4c27",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Build SQL Update",
        "func": "var id = msg.id;\nvar andon = msg.andon;\n\nif(msg.id == \"1\"){\n    msg.topic = `UPDATE table_andon SET andon='${andon}' WHERE id=${id}`;  \n    return msg;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4595,
        "y": 2370,
        "wires": [
            [
                "7d3404510b5bd1d3"
            ]
        ]
    },
    {
        "id": "ffd1929d12f5833f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ON ANDON",
        "func": "if (\n    msg.payload.iaa33_pin === \"1\" || msg.payload.iaa33_roller === \"1\" ||\n    msg.payload.iaa33_arm === \"1\" || msg.payload.iaa35_pin === \"1\" ||\n    msg.payload.iaa35_roller === \"1\" || msg.payload.iaa35_arm === \"1\" ||\n    msg.payload.iaa36_pin === \"1\" || msg.payload.iaa36_roller === \"1\" ||\n    msg.payload.iaa36_arm === \"1\" || msg.payload.iam72_hopper === \"1\" ||\n    msg.payload.iam72_mc_fault === \"1\" || msg.payload.iam73_hopper === \"1\" ||\n    msg.payload.iam73_mc_fault === \"1\" || msg.payload.iam80_hopper === \"1\" ||\n    msg.payload.iam80_mc_fault === \"1\" || msg.payload.ispbr3_mc_fault === \"1\"\n) {\n    msg.payload = { \"status\": \"1\" };\n    return msg;\n} else if(    \n    msg.payload.iaa33_pin !== \"1\" || msg.payload.iaa33_roller !== \"1\" ||\n    msg.payload.iaa33_arm !== \"1\" || msg.payload.iaa35_pin !== \"1\" ||\n    msg.payload.iaa35_roller !== \"1\" || msg.payload.iaa35_arm !== \"1\" ||\n    msg.payload.iaa36_pin !== \"1\" || msg.payload.iaa36_roller !== \"1\" ||\n    msg.payload.iaa36_arm !== \"1\" || msg.payload.iam72_hopper !== \"1\" ||\n    msg.payload.iam72_mc_fault !== \"1\" || msg.payload.iam73_hopper !== \"1\" ||\n    msg.payload.iam73_mc_fault !== \"1\" || msg.payload.iam80_hopper !== \"1\" ||\n    msg.payload.iam80_mc_fault !== \"1\" || msg.payload.ispbr3_mc_fault !== \"1\") {\n    msg.payload = { \"status\": \"0\" };\n    return msg;\n    \n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4060,
        "y": 1330,
        "wires": [
            [
                "e4fdf246ffee5be5"
            ]
        ]
    },
    {
        "id": "e394a0bcc4513731",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ANDON ON",
        "func": "if(msg.payload == \"1\"){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"ON\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4410,
        "y": 2345,
        "wires": [
            [
                "73f7e665eb7f4c27"
            ]
        ]
    },
    {
        "id": "6f74672bd2fe104f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ANDON OFF",
        "func": "if(msg.payload === '0'){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"OFF\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4410,
        "y": 2395,
        "wires": [
            [
                "73f7e665eb7f4c27"
            ]
        ]
    },
    {
        "id": "564c09b66870070d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "MANUAL ON",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "{\"status\":\"1\"}",
        "payloadType": "json",
        "x": 4025,
        "y": 2315,
        "wires": [
            [
                "e4fdf246ffee5be5"
            ]
        ]
    },
    {
        "id": "e4fdf246ffee5be5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "on",
        "func": "\n\nif(msg.payload.status === \"1\"){\n    msg.payload = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4225,
        "y": 2345,
        "wires": [
            [
                "e394a0bcc4513731",
                "ef4c96abf74bb067"
            ]
        ]
    },
    {
        "id": "69f06577083d8799",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "off",
        "func": "\nif(msg.payload.status === \"0\"){\n    msg.payload = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4225,
        "y": 2380,
        "wires": [
            [
                "6f74672bd2fe104f",
                "6db2c6553815769a"
            ]
        ]
    },
    {
        "id": "116e10a65bdabbd5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_arm_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_arm = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1370,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "3606ed991b883daa",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}// var andon_iaa33_arm;\n// var andon_iaa33_pin;\n// var andon_iaa33_roller;\n// var andon_iaa35_arm;\n// var andon_iaa35_roller;\n// var andon_iaa35_pin;\n// var andon_iam73_hopper;\n// var andon_iam73_mc_fault;\n// var andon_iam72_hopper;\n// var andon_iam72_mc_fault;\n\n// var andon_iaa36_arm = 2; // Default value\n// var andon_iaa36_roller = 2; // Default value\n// var andon_iaa36_pin = 2; // Default value\n// var andon_iam80_hopper = 2; // Default value\n// var andon_iam80_mc_fault = 2; // Default value\n// var ispbr3_arm = 2; // Default value\n// var ispbr3_mc_fault = 2; // Default value\n\n\n\n// Kondisi untuk iaa33_arm\nif (msg.payload.iaa33_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n// var data = {\n//     iaa33_bearing: andon_iaa33_roller,\n//     iaa33_pin: andon_iaa33_pin,\n//     iaa33_arm: andon_iaa33_arm,\n//     iaa35_bearing: andon_iaa35_roller,\n//     iaa35_pin: andon_iaa35_pin,\n//     iaa35_arm: andon_iaa35_arm,\n//     iaa36_bearing: andon_iaa36_roller,\n//     iaa36_pin: andon_iaa36_pin,\n//     iaa36_arm: andon_iaa36_arm,\n//     iam72_hopper: andon_iam72_hopper,\n//     iam72_mc_fault: andon_iam72_mc_fault,\n//     iam73_hopper: andon_iam73_hopper,\n//     iam73_mc_fault: andon_iam73_mc_fault,\n//     iam80_hopper: andon_iam80_hopper,\n//     iam80_mc_fault: andon_iam80_mc_fault,\n//     ispbr3_arm: ispbr3_arm,\n//     ispbr3_mc_fault: ispbr3_mc_fault\n// };\n\n\n\n\n// var query = `\n//     UPDATE table_condition_andon\n//     SET iaa33_bearing = ${data.iaa33_bearing},\n//         iaa33_pin = ${data.iaa33_pin},\n//         iaa33_arm = ${data.iaa33_arm},\n//         iaa35_bearing = ${data.iaa35_bearing},\n//         iaa35_pin = ${data.iaa35_pin},\n//         iaa35_arm = ${data.iaa35_arm},\n//         iaa36_bearing = ${data.iaa36_bearing},\n//         iaa36_pin = ${data.iaa36_pin},\n//         iaa36_arm = ${data.iaa36_arm},\n//         iam72_hopper = ${data.iam72_hopper},\n//         iam72_mc_fault = ${data.iam72_mc_fault},\n//         iam73_hopper = ${data.iam73_hopper},\n//         iam73_mc_fault = ${data.iam73_mc_fault},\n//         iam80_hopper = ${data.iam80_hopper},\n//         iam80_mc_fault = ${data.iam80_mc_fault},\n//         ispbr3_arm = ${data.ispbr3_arm},\n//         ispbr3_mc_fault = ${data.ispbr3_mc_fault}\n//     WHERE id = 1\n// `;\n\n\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1410,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "17f54b3bd7ad7e63",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_pin = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1450,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "8a3294c8e54f10a2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_arm_on",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa33_arm = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1490,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "643cd26438f95799",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1530,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "842d089a282aa4be",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_pin = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1570,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "b4d91c5d19326a7f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1735,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "ef642999de741ff4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam72_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1655,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "5e715555ca8552e8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "INSERT DATA CORE DASHBOARD",
        "func": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa35_arm\nif (msg.payload.iaa35_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_pin\nif (msg.payload.iaa35_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_roller\nif (msg.payload.iaa35_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iaa33_arm\nif (msg.payload.iaa33_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_pin\nif (msg.payload.iaa33_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_roller\nif (msg.payload.iaa33_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa36_arm\nif (msg.payload.iaa36_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa36_pin\nif (msg.payload.iaa36_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa36_roller\nif (msg.payload.iaa36_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iam72_mc_fault\nif (msg.payload.iam72_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam72_hopper\nif (msg.payload.iam72_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n// Kondisi untuk iam73_mc_fault\nif (msg.payload.iam73_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam73_hopper\nif (msg.payload.iam73_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iam80_mc_fault\nif (msg.payload.iam80_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam80_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam80_hopper\nif (msg.payload.iam80_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam80_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk ispbr3_mc_fault\nif (msg.payload.ispbr3_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.ispbr3_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n// MEMATIKAN DASHOBAR PROCESS BAREL\nif (msg.payload.ispbr3_fullwork == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_arm_nr = 2, ispbr3_arm_d31e = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4090,
        "y": 1660,
        "wires": [
            [
                "cd2aec7d3efe5e4f",
                "107e750955f2c195"
            ]
        ]
    },
    {
        "id": "e5ab44b863f952f1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1695,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "24735e8294c229de",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam72_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1615,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "4e0e6058e5366115",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam73_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2425,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "b588c62485ac00ec",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam73_hopper = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2465,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "3c986d9228ccfc03",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam72_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2345,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "86d2010727a43d82",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam72_hopper = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2385,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "aa1e2b57562f7eff",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_arm_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa35_arm = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2100,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "d56b69422e67e44c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa35_roller = \"0\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2140,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "abc309c06e9c2340",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_pin_off",
        "func": "if (msg.payload.action == \"stop\") {\n    msg.payload.iaa35_pin = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2180,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "1e68251233a7633d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_arm_off",
        "func": "if(msg.payload.action === \"stop\"){\n    msg.payload.iaa33_arm = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2220,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "14c378f62e069709",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa33_roller = \"0\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2260,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "368f6cfff698fa2d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_pin_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa33_pin = \"0\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2300,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "cd2aec7d3efe5e4f",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 79",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4325,
        "y": 1690,
        "wires": []
    },
    {
        "id": "0acc3ac5f858192d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "MANUAL OFF",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "{\"status\":\"0\"}",
        "payloadType": "json",
        "x": 4025,
        "y": 2420,
        "wires": [
            [
                "69f06577083d8799"
            ]
        ]
    },
    {
        "id": "b85815543742d2d4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ANDON OFF",
        "func": "if (\n    msg.payload.iaa33_pin === \"0\" && msg.payload.iaa33_roller === \"0\" &&\n    msg.payload.iaa33_arm === \"0\" && msg.payload.iaa35_pin === \"0\" &&\n    msg.payload.iaa35_roller === \"0\" && msg.payload.iaa35_arm === \"0\" &&\n    msg.payload.iaa36_pin === \"0\" && msg.payload.iaa36_roller === \"0\" &&\n    msg.payload.iaa36_arm === \"0\" && msg.payload.iam72_hopper === \"0\" &&\n    msg.payload.iam72_mc_fault === \"0\" && msg.payload.iam73_hopper === \"0\" &&\n    msg.payload.iam73_mc_fault === \"0\"\n)  {\n    msg.payload = { \"status\": \"0\" };\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4065,
        "y": 1380,
        "wires": [
            [
                "69f06577083d8799"
            ]
        ]
    },
    {
        "id": "2dbbebf60c3dd601",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 1825,
        "wires": [
            [
                "0a04f18f8e38b17e"
            ]
        ]
    },
    {
        "id": "99fd732edeafe369",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 1865,
        "wires": [
            [
                "0a04f18f8e38b17e"
            ]
        ]
    },
    {
        "id": "37156017dcc052ea",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 1915,
        "wires": [
            [
                "ecae2a9fe53d6a0f"
            ]
        ]
    },
    {
        "id": "1314a44c9b53b6a4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 1950,
        "wires": [
            [
                "ecae2a9fe53d6a0f"
            ]
        ]
    },
    {
        "id": "1692643e057d1108",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 2000,
        "wires": [
            [
                "b376bf90015e130e"
            ]
        ]
    },
    {
        "id": "d19ef0be15809903",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 2035,
        "wires": [
            [
                "b376bf90015e130e"
            ]
        ]
    },
    {
        "id": "68f2cde65525b7f6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1840,
        "y": 2115,
        "wires": [
            [
                "6137516d41cbac48",
                "8a3294c8e54f10a2"
            ]
        ]
    },
    {
        "id": "badf25f312d28ef3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1840,
        "y": 2150,
        "wires": [
            [
                "6137516d41cbac48",
                "1e68251233a7633d"
            ]
        ]
    },
    {
        "id": "e1cfdaca8e7e6336",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 2200,
        "wires": [
            [
                "96dc9e7dc0bf6ec0",
                "643cd26438f95799"
            ]
        ]
    },
    {
        "id": "e56c8509a54c30b7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 2235,
        "wires": [
            [
                "96dc9e7dc0bf6ec0",
                "14c378f62e069709"
            ]
        ]
    },
    {
        "id": "09845ba021e634c0",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1840,
        "y": 2285,
        "wires": [
            [
                "a98d0c70ed6ccd83",
                "842d089a282aa4be"
            ]
        ]
    },
    {
        "id": "c06de27e97aa9a27",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1840,
        "y": 2320,
        "wires": [
            [
                "a98d0c70ed6ccd83",
                "368f6cfff698fa2d"
            ]
        ]
    },
    {
        "id": "56e0fe5ed79120b9",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_mcfault#",
        "payloadType": "str",
        "x": 1460,
        "y": 1940,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "9daa8de4d49be996",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_mcfault#",
        "payloadType": "str",
        "x": 1465,
        "y": 1905,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "dc4f26b838ebaa95",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_toolchange#",
        "payloadType": "str",
        "x": 1465,
        "y": 2030,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "bfa826961631cce0",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_toolchange#",
        "payloadType": "str",
        "x": 1470,
        "y": 1995,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "cbec01e59f58c274",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_qualitycheck#",
        "payloadType": "str",
        "x": 1470,
        "y": 2120,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "b55e224d322374f1",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_qualitycheck#",
        "payloadType": "str",
        "x": 1475,
        "y": 2085,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "0b8c842a86c4aaa8",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_arm#",
        "payloadType": "str",
        "x": 1460,
        "y": 2210,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "f2b5eedfeb869d8c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_arm#",
        "payloadType": "str",
        "x": 1465,
        "y": 2175,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "6f9f74dde3861a2a",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_roller#",
        "payloadType": "str",
        "x": 1455,
        "y": 2295,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "75dfd7c9f8fcd187",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_roller#",
        "payloadType": "str",
        "x": 1460,
        "y": 2260,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "e19d244aa8be6026",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_pin#",
        "payloadType": "str",
        "x": 1450,
        "y": 2380,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "578c8574e8293730",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_pin#",
        "payloadType": "str",
        "x": 1455,
        "y": 2345,
        "wires": [
            [
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "f307cf15e1daa00f",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 2260,
        "y": 295,
        "wires": [
            [
                "b7e5d02daa27f01b",
                "fb3b1fea59c01a6d",
                "17678b1cef8a7c26",
                "6c4b90c793d25dac"
            ]
        ]
    },
    {
        "id": "b7e5d02daa27f01b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "insert_iaa33",
        "func": "\nvar line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (msg.payload[0] == \"30\") {\n    line_name = 'Roller Arm IAA35'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_montiv_roller_arm_iaa_33 (id, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n};\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2420,
        "y": 295,
        "wires": [
            [
                "0c016f292decf4dd"
            ]
        ]
    },
    {
        "id": "fb3b1fea59c01a6d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "insert_iaa35",
        "func": "\nvar line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (msg.payload[0] == \"31\") {\n    line_name = 'Roller Arm IAA33'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_montiv_roller_arm_iaa_35 (id, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n};\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2420,
        "y": 335,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "e54d0b94105fe120",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "30,LOKAL,3980,4944,136,293,2,195,NORMAL,0,0,OFF;",
        "payloadType": "str",
        "x": 2120,
        "y": 295,
        "wires": [
            [
                "f307cf15e1daa00f"
            ]
        ]
    },
    {
        "id": "9f3905100458d398",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 80",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1790,
        "y": 2755,
        "wires": []
    },
    {
        "id": "cacfcaaa5ad2813a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2195,
        "y": 765,
        "wires": [
            [
                "8630e87eadf4f9b9"
            ]
        ]
    },
    {
        "id": "8fe5d5b955dcdc83",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2215,
        "y": 825,
        "wires": [
            [
                "836a6213d9cbdc55"
            ]
        ]
    },
    {
        "id": "f39fcc1d6090e13a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2205,
        "y": 885,
        "wires": [
            [
                "e609d0175c857dc1"
            ]
        ]
    },
    {
        "id": "abb565ec2febc77f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2205,
        "y": 945,
        "wires": [
            [
                "2854a60573e58d58"
            ]
        ]
    },
    {
        "id": "e6325cb8a766d7ea",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2220,
        "y": 1015,
        "wires": [
            [
                "be8f73834f88887a"
            ]
        ]
    },
    {
        "id": "cfbf158d8095e4a1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2205,
        "y": 1095,
        "wires": [
            [
                "321cc8bf9deb0351"
            ]
        ]
    },
    {
        "id": "8630e87eadf4f9b9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2485,
        "y": 765,
        "wires": [
            [
                "6019306b69c0e8f4"
            ]
        ]
    },
    {
        "id": "836a6213d9cbdc55",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2505,
        "y": 825,
        "wires": [
            [
                "6019306b69c0e8f4"
            ]
        ]
    },
    {
        "id": "e609d0175c857dc1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2495,
        "y": 885,
        "wires": [
            [
                "6019306b69c0e8f4"
            ]
        ]
    },
    {
        "id": "2854a60573e58d58",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2495,
        "y": 945,
        "wires": [
            [
                "6019306b69c0e8f4"
            ]
        ]
    },
    {
        "id": "be8f73834f88887a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2505,
        "y": 1005,
        "wires": [
            [
                "6019306b69c0e8f4"
            ]
        ]
    },
    {
        "id": "321cc8bf9deb0351",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2495,
        "y": 1065,
        "wires": [
            [
                "6019306b69c0e8f4"
            ]
        ]
    },
    {
        "id": "cf5677f457c21395",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1620,
        "y": 445,
        "wires": [
            [
                "abd8ef01d717f0ef",
                "0ae12518457f3fc9",
                "7eec2b31de7e9df6",
                "dd9cc809bda68318",
                "ad39e790b638995f",
                "ccfb9753be7614ec",
                "d572fc48d94405c3",
                "2c9d1b2dac0a3651",
                "c7214774ddc1fc43",
                "59ec13bc4ce3581f",
                "1cedcc5a6e67768b",
                "4ff9f8cf6df39176"
            ]
        ]
    },
    {
        "id": "d572fc48d94405c3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1895,
        "y": 425,
        "wires": [
            [
                "cacfcaaa5ad2813a"
            ]
        ]
    },
    {
        "id": "2c9d1b2dac0a3651",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1895,
        "y": 460,
        "wires": [
            [
                "cacfcaaa5ad2813a"
            ]
        ]
    },
    {
        "id": "c7214774ddc1fc43",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1915,
        "y": 510,
        "wires": [
            [
                "8fe5d5b955dcdc83"
            ]
        ]
    },
    {
        "id": "59ec13bc4ce3581f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1915,
        "y": 545,
        "wires": [
            [
                "8fe5d5b955dcdc83"
            ]
        ]
    },
    {
        "id": "1cedcc5a6e67768b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1915,
        "y": 595,
        "wires": [
            [
                "f39fcc1d6090e13a"
            ]
        ]
    },
    {
        "id": "4ff9f8cf6df39176",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam36off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iam36off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1915,
        "y": 630,
        "wires": [
            [
                "f39fcc1d6090e13a"
            ]
        ]
    },
    {
        "id": "abd8ef01d717f0ef",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1885,
        "y": 715,
        "wires": [
            [
                "abb565ec2febc77f",
                "5b422dbc2a03bf1e"
            ]
        ]
    },
    {
        "id": "0ae12518457f3fc9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1885,
        "y": 750,
        "wires": [
            [
                "abb565ec2febc77f",
                "192b79e9748430ec"
            ]
        ]
    },
    {
        "id": "7eec2b31de7e9df6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1895,
        "y": 800,
        "wires": [
            [
                "e6325cb8a766d7ea",
                "f64571321a0abcbf"
            ]
        ]
    },
    {
        "id": "dd9cc809bda68318",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1895,
        "y": 835,
        "wires": [
            [
                "e6325cb8a766d7ea",
                "2eda3b654aa03bcf"
            ]
        ]
    },
    {
        "id": "ad39e790b638995f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1885,
        "y": 885,
        "wires": [
            [
                "cfbf158d8095e4a1",
                "b513629bad049e68"
            ]
        ]
    },
    {
        "id": "ccfb9753be7614ec",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1885,
        "y": 920,
        "wires": [
            [
                "cfbf158d8095e4a1",
                "0708a263ebbf9e2f"
            ]
        ]
    },
    {
        "id": "d4745a649b120436",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_mcfault#",
        "payloadType": "str",
        "x": 1485,
        "y": 535,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "631131bbe90d1928",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_mcfault#",
        "payloadType": "str",
        "x": 1490,
        "y": 500,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "28c862ea1a14abfd",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_toolchange#",
        "payloadType": "str",
        "x": 1490,
        "y": 625,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "2949e8122cb8fc5d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_toolchange#",
        "payloadType": "str",
        "x": 1495,
        "y": 590,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "ebcd6438d30b7260",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_qualitycheck#",
        "payloadType": "str",
        "x": 1495,
        "y": 715,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "bb4124844f7c1dc4",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_qualitycheck#",
        "payloadType": "str",
        "x": 1500,
        "y": 680,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "b18d9a5e6e076451",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_arm#",
        "payloadType": "str",
        "x": 1485,
        "y": 805,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "abb5c02bd3c742c7",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_arm#",
        "payloadType": "str",
        "x": 1490,
        "y": 770,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "e9ad4b1240bb5291",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_roller#",
        "payloadType": "str",
        "x": 1480,
        "y": 890,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "d20b2f18ec922262",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_roller#",
        "payloadType": "str",
        "x": 1485,
        "y": 855,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "fdd3a7b9a7f65bda",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_pin#",
        "payloadType": "str",
        "x": 1475,
        "y": 975,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "31887e9742b9411a",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_pin#",
        "payloadType": "str",
        "x": 1480,
        "y": 940,
        "wires": [
            [
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "8ebf6647374129d8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2195,
        "y": 3410,
        "wires": [
            [
                "613750aa1132b768"
            ]
        ]
    },
    {
        "id": "a3dd72d123f552a6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2210,
        "y": 3450,
        "wires": [
            [
                "913d53e3bd5a82c5"
            ]
        ]
    },
    {
        "id": "613750aa1132b768",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2510,
        "y": 3405,
        "wires": [
            [
                "a6ba1dc94babfe0c"
            ]
        ]
    },
    {
        "id": "913d53e3bd5a82c5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2525,
        "y": 3465,
        "wires": [
            [
                "a6ba1dc94babfe0c"
            ]
        ]
    },
    {
        "id": "e3678231ba30bb84",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80off_mcfault#",
        "payloadType": "str",
        "x": 1395,
        "y": 3290,
        "wires": [
            [
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "a70e5d35368b5963",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80on_mcfault#",
        "payloadType": "str",
        "x": 1400,
        "y": 3255,
        "wires": [
            [
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "0a205347b9fb87cb",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1825,
        "y": 3375,
        "wires": [
            [
                "8ebf6647374129d8",
                "806356666d2a61de"
            ]
        ]
    },
    {
        "id": "80e7f52e04825140",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1825,
        "y": 3410,
        "wires": [
            [
                "8ebf6647374129d8",
                "60a4322643850bc6"
            ]
        ]
    },
    {
        "id": "7afe618c77689441",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1635,
        "y": 3430,
        "wires": [
            [
                "0a205347b9fb87cb",
                "80e7f52e04825140",
                "8a2e2328ad34785b",
                "baa8a4e617c49827",
                "5739720b306d9de9"
            ]
        ]
    },
    {
        "id": "8a2e2328ad34785b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1845,
        "y": 3450,
        "wires": [
            [
                "a3dd72d123f552a6",
                "98853e27404cb824"
            ]
        ]
    },
    {
        "id": "baa8a4e617c49827",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1845,
        "y": 3490,
        "wires": [
            [
                "a3dd72d123f552a6",
                "d1b17cc4df26aace"
            ]
        ]
    },
    {
        "id": "db6847db80dd0edf",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80off_hoppernopart#",
        "payloadType": "str",
        "x": 1410,
        "y": 3380,
        "wires": [
            [
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "73cc4fc5e482e59f",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80on_hoppernopart#",
        "payloadType": "str",
        "x": 1415,
        "y": 3345,
        "wires": [
            [
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "5739720b306d9de9",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 81",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1785,
        "y": 3330,
        "wires": []
    },
    {
        "id": "6019306b69c0e8f4",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "f3c84c2a50e35eda",
        "name": "",
        "x": 2805,
        "y": 930,
        "wires": [
            []
        ]
    },
    {
        "id": "14d1d8d3775e7542",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1615,
        "y": 3150,
        "wires": [
            [
                "8103e9dc06b8097a",
                "20df6da802ee1b8a",
                "bc8c3ee05106e138",
                "ceceb4be07425fd7",
                "a6bdbffcfadd2e91"
            ]
        ]
    },
    {
        "id": "8103e9dc06b8097a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1825,
        "y": 3085,
        "wires": [
            [
                "e19f5e69b4f25cef",
                "e5ab44b863f952f1"
            ]
        ]
    },
    {
        "id": "20df6da802ee1b8a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1825,
        "y": 3120,
        "wires": [
            [
                "e19f5e69b4f25cef",
                "4e0e6058e5366115"
            ]
        ]
    },
    {
        "id": "bc8c3ee05106e138",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1845,
        "y": 3160,
        "wires": [
            [
                "48f7e8fb9de7da3e",
                "b4d91c5d19326a7f"
            ]
        ]
    },
    {
        "id": "ceceb4be07425fd7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1845,
        "y": 3200,
        "wires": [
            [
                "48f7e8fb9de7da3e",
                "b588c62485ac00ec"
            ]
        ]
    },
    {
        "id": "a6bdbffcfadd2e91",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 82",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1765,
        "y": 3025,
        "wires": []
    },
    {
        "id": "a6ba1dc94babfe0c",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "79205502032234cb",
        "name": "",
        "x": 2825,
        "y": 3450,
        "wires": [
            []
        ]
    },
    {
        "id": "5b422dbc2a03bf1e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_arm_on",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa36_arm = \"1\";\n    return msg;\n}\n\nelse {\n    msg.payload.iaa36_arm = \"0\";\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1250,
        "wires": [
            [
                "ffd1929d12f5833f",
                "5e715555ca8552e8",
                "fe388b2be0519818"
            ]
        ]
    },
    {
        "id": "f64571321a0abcbf",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa36_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1290,
        "wires": [
            [
                "ffd1929d12f5833f",
                "5e715555ca8552e8",
                "fe388b2be0519818"
            ]
        ]
    },
    {
        "id": "b513629bad049e68",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa36_pin = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1330,
        "wires": [
            [
                "ffd1929d12f5833f",
                "5e715555ca8552e8"
            ]
        ]
    },
    {
        "id": "192b79e9748430ec",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_arm_off",
        "func": "if(msg.payload.action === \"stop\"){\n    msg.payload.iaa36_arm = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 1980,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "2eda3b654aa03bcf",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa36_roller = \"0\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2020,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "0708a263ebbf9e2f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_pin_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa36_pin = \"0\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3255,
        "y": 2060,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "98853e27404cb824",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam80_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1815,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "806356666d2a61de",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam80_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1775,
        "wires": [
            [
                "5e715555ca8552e8"
            ]
        ]
    },
    {
        "id": "60a4322643850bc6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam80_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2510,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "d1b17cc4df26aace",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam80_hopper = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2550,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "e1d3511eb1b374fc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2245,
        "y": 3980,
        "wires": [
            [
                "8c58d814d097bb3d"
            ]
        ]
    },
    {
        "id": "7f7129eb7e222608",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration ispbr3on_fullwork",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2260,
        "y": 4040,
        "wires": [
            [
                "895d27aa51cb8f13"
            ]
        ]
    },
    {
        "id": "8c58d814d097bb3d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_mcfault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2560,
        "y": 3975,
        "wires": [
            [
                "4f8fefd370f38925"
            ]
        ]
    },
    {
        "id": "895d27aa51cb8f13",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL ispbr3on_fullwork",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_fullwork (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2595,
        "y": 4040,
        "wires": [
            [
                "4f8fefd370f38925"
            ]
        ]
    },
    {
        "id": "c77cd7ef973ac4ca",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3off_mcfault#",
        "payloadType": "str",
        "x": 1410,
        "y": 3875,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "ac3fd49091643aef",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3on_mcfault#",
        "payloadType": "str",
        "x": 1415,
        "y": 3840,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "7cad1dac765eda28",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1875,
        "y": 3945,
        "wires": [
            [
                "e1d3511eb1b374fc",
                "a5f298f6b017031f"
            ]
        ]
    },
    {
        "id": "d468701105d86412",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1875,
        "y": 3980,
        "wires": [
            [
                "e1d3511eb1b374fc",
                "f6e0353320e032f3"
            ]
        ]
    },
    {
        "id": "720151b304a20c07",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1640,
        "y": 3675,
        "wires": [
            [
                "7cad1dac765eda28",
                "d468701105d86412",
                "61fed4029a3ade89",
                "5281c64687b802a5",
                "e481a55508d304e3",
                "936e6a37ba5dad7b",
                "001f7722ea6b62b0",
                "bbf4c045deec91b9",
                "fb6f328f84840bd0"
            ]
        ]
    },
    {
        "id": "61fed4029a3ade89",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_fullwork#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_fullwork\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1875,
        "y": 4020,
        "wires": [
            [
                "7f7129eb7e222608",
                "ef51ce52f73e627e"
            ]
        ]
    },
    {
        "id": "5281c64687b802a5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_fullwork#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_fullwork\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1875,
        "y": 4060,
        "wires": [
            [
                "7f7129eb7e222608",
                "1ce21a50319dcf30"
            ]
        ]
    },
    {
        "id": "0077227457ecf806",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3off_qualitycheck#",
        "payloadType": "str",
        "x": 1420,
        "y": 4105,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "e6b2e6d4acffac32",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3on_qualitycheck#",
        "payloadType": "str",
        "x": 1425,
        "y": 4070,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "e481a55508d304e3",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 83",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1840,
        "y": 3865,
        "wires": []
    },
    {
        "id": "4f8fefd370f38925",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "d9976337d8f1a2e5",
        "name": "",
        "x": 2910,
        "y": 4150,
        "wires": [
            []
        ]
    },
    {
        "id": "c4c3eb72df283504",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_qualitycheckmtc#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3off_qualitycheckmtc#",
        "payloadType": "str",
        "x": 1430,
        "y": 4215,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "8e7af4ccf9dbf117",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_qualitycheckmtc#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3on_qualitycheckmtc#",
        "payloadType": "str",
        "x": 1435,
        "y": 4180,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "936e6a37ba5dad7b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_qualitycheck#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_qualitycheck\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1895,
        "y": 4100,
        "wires": [
            [
                "5c27e7e139d73917"
            ]
        ]
    },
    {
        "id": "001f7722ea6b62b0",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_qualitycheck#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_qualitycheck\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1895,
        "y": 4140,
        "wires": [
            [
                "5c27e7e139d73917"
            ]
        ]
    },
    {
        "id": "5c27e7e139d73917",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration ispbr3on_qualitycheck",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2275,
        "y": 4115,
        "wires": [
            [
                "61a3da03c4955478"
            ]
        ]
    },
    {
        "id": "61a3da03c4955478",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL ispbr3on_qualitycheck",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_qualitycheck (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2610,
        "y": 4115,
        "wires": [
            [
                "4f8fefd370f38925"
            ]
        ]
    },
    {
        "id": "e6292e9a6f5d2bbe",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_fullwork#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3on_fullwork#",
        "payloadType": "str",
        "x": 1410,
        "y": 3950,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "2189e8bccab320b4",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_fullwork#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*ispbr3off_fullwork#",
        "payloadType": "str",
        "x": 1405,
        "y": 3985,
        "wires": [
            [
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "bbf4c045deec91b9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "*ispbr3on_qualitycheckmtc#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_qualitycheckmtc\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1905,
        "y": 4180,
        "wires": [
            [
                "6c7d0674c735580a"
            ]
        ]
    },
    {
        "id": "fb6f328f84840bd0",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "*ispbr3off_qualitycheckmtc#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_qualitycheckmtc\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1905,
        "y": 4220,
        "wires": [
            [
                "6c7d0674c735580a"
            ]
        ]
    },
    {
        "id": "6c7d0674c735580a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration ispbr3on_qualitycheckmtc",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2285,
        "y": 4195,
        "wires": [
            [
                "bc1be854effed652"
            ]
        ]
    },
    {
        "id": "bc1be854effed652",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL ispbr3on_qualitycheckmtc",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_qualitycheckmtc (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2640,
        "y": 4195,
        "wires": [
            [
                "4f8fefd370f38925"
            ]
        ]
    },
    {
        "id": "a5f298f6b017031f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.ispbr3_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1860,
        "wires": [
            [
                "5e715555ca8552e8",
                "ffd1929d12f5833f"
            ]
        ]
    },
    {
        "id": "f6e0353320e032f3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.ispbr3_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 2590,
        "wires": [
            [
                "5e715555ca8552e8",
                "b85815543742d2d4"
            ]
        ]
    },
    {
        "id": "ef51ce52f73e627e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3_fullwork_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.ispbr3_fullwork = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 1905,
        "wires": [
            [
                "5e715555ca8552e8"
            ]
        ]
    },
    {
        "id": "1ce21a50319dcf30",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3_fullwork_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.ispbr3_fullwork = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3260,
        "y": 2630,
        "wires": [
            [
                "5e715555ca8552e8"
            ]
        ]
    },
    {
        "id": "17678b1cef8a7c26",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "get_loading_time_iaa35_on",
        "func": "var data_condition;\ndata_condition = msg.payload[0];\nif (data_condition == \"30\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2665,
        "y": 205,
        "wires": [
            [
                "83ee7cda44c8bb95"
            ]
        ]
    },
    {
        "id": "6c4b90c793d25dac",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "get_loading_time_iaa35_off",
        "func": "var data_condition;\ndata_condition = msg.payload[0];\nif (data_condition == \"30-off\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2665,
        "y": 240,
        "wires": [
            [
                "83ee7cda44c8bb95"
            ]
        ]
    },
    {
        "id": "91a04145c718f341",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "30,1,2,3,4,5,6,7,",
        "payloadType": "str",
        "x": 2150,
        "y": 175,
        "wires": [
            [
                "5e8e34efb81f1a10"
            ]
        ]
    },
    {
        "id": "324ed23e0b4bbd4c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "30-off,1,2,3,4,5,6,7,",
        "payloadType": "str",
        "x": 2160,
        "y": 210,
        "wires": [
            [
                "5e8e34efb81f1a10"
            ]
        ]
    },
    {
        "id": "5e8e34efb81f1a10",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 2335,
        "y": 175,
        "wires": [
            [
                "17678b1cef8a7c26",
                "6c4b90c793d25dac",
                "8e01bc7d1c3ea85d"
            ]
        ]
    },
    {
        "id": "8e01bc7d1c3ea85d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "get_loading_time_iaa35_pause",
        "func": "var data_condition;\ndata_condition = msg.payload[0];\nif (data_condition == \"30-pause\"){\n    msg.payload = {\n        \"action\": \"pause\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2675,
        "y": 275,
        "wires": [
            [
                "83ee7cda44c8bb95"
            ]
        ]
    },
    {
        "id": "21275d4cf72d7b82",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "30-pause,1,2,3,4,5,6,7,",
        "payloadType": "str",
        "x": 2170,
        "y": 245,
        "wires": [
            [
                "5e8e34efb81f1a10"
            ]
        ]
    },
    {
        "id": "83ee7cda44c8bb95",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "get_loading_time_iaa35",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\nif (!context.interval) {\n    context.interval = null;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n\n        // Clear any existing interval\n        if (context.interval) {\n            clearInterval(context.interval);\n        }\n\n        // Start a new interval to update the running time\n        context.interval = setInterval(() => {\n            if (context.startTime) {\n                let currentTime = new Date();\n                let runningTime = (currentTime - context.startTime - context.pausedDuration) / 1000; // Convert to seconds\n                let displayTime = Math.floor(runningTime); // Round to nearest second\n                node.status({ fill: \"green\", shape: \"dot\", text: `Running: ${displayTime} sec` });\n                \n                // Output the current running time to a debug or another node\n                msg.payload = { runningTime: displayTime };\n                node.send(msg); // Send message with current running time\n            }\n        }, 1000); // Update every second\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate total duration in seconds\n\n        // Clear the interval when stopping\n        if (context.interval) {\n            clearInterval(context.interval);\n            context.interval = null;\n        }\n\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the total duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n\n        // Clear the interval while paused\n        if (context.interval) {\n            clearInterval(context.interval);\n            context.interval = null;\n        }\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n\n    // Clear the interval on reset\n    if (context.interval) {\n        clearInterval(context.interval);\n        context.interval = null;\n    }\n\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 2,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2965,
        "y": 105,
        "wires": [
            [
                "85a184816a5336b2",
                "5e93fd8572524d74"
            ]
        ]
    },
    {
        "id": "85a184816a5336b2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL get_loading_time",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_loading_time (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3265,
        "y": 275,
        "wires": [
            [
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "5e93fd8572524d74",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "update_loading_time_persecond",
        "func": "var getObj;\ngetObj = msg.payload.runningTime;\n\nif (getObj) {\n    let sql = `INSERT INTO timer_durations_loading_time_persecond (timer_id, duration) VALUES (1, ${getObj})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3260,
        "y": 230,
        "wires": [
            [
                "7c17f80aba10b839",
                "bb65c127b5b7a9e7"
            ]
        ]
    },
    {
        "id": "7c17f80aba10b839",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 86",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.runningTime",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3475,
        "y": 200,
        "wires": []
    },
    {
        "id": "8d2cc1c0c4a0b90a",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*^iaa36^data^#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*^iaa36^1^1^1^0^1^0^1^#",
        "payloadType": "str",
        "x": 190,
        "y": 495,
        "wires": [
            [
                "891c5f8559147b96"
            ]
        ]
    },
    {
        "id": "a9d59e53538969ea",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing IAA36",
        "func": "\nif(msg.payload[1] === \"iaa36\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 545,
        "y": 185,
        "wires": [
            [
                "7844ecfad7f8c048",
                "bc740b7529160ed2",
                "f478a2ae29c6fbd7",
                "1648d158a8b632da",
                "7715bc0e41d7ecb8",
                "282514c30c2ce1cd",
                "39dbc1988cccc2df",
                "4ed0320b2d036599",
                "8bc0b823e0c0c1d7",
                "0ccd4bb989d9ad9e",
                "78ae16f5e2f80aac",
                "d19aa6de332ce723",
                "41d5a651f65cbed8",
                "0a04e0a9d4647adc",
                "48ba7f441b59777b"
            ]
        ]
    },
    {
        "id": "891c5f8559147b96",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "always_send",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 375,
        "y": 100,
        "wires": [
            [
                "a9d59e53538969ea",
                "e59080f9753c1639",
                "b90bd5630b69c52a",
                "c124b57d14ccfc64",
                "3362d719edab9a4c",
                "c0e156c061255a40",
                "44ffa5b3556ae015"
            ]
        ]
    },
    {
        "id": "1f5ead90d5c1d41f",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "Parsed Data Output",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 605,
        "y": 50,
        "wires": []
    },
    {
        "id": "1c9cc79a1c6c2788",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 154",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 215,
        "wires": []
    },
    {
        "id": "7844ecfad7f8c048",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 155",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 180,
        "wires": []
    },
    {
        "id": "b79643eb37123cb1",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 156",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 290,
        "wires": []
    },
    {
        "id": "bc740b7529160ed2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iaa36on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 240,
        "wires": [
            [
                "1c9cc79a1c6c2788",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "f478a2ae29c6fbd7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"*iaa36off_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 275,
        "wires": [
            [
                "03a4cf29493a3cc3",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "03a4cf29493a3cc3",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 157",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 250,
        "wires": []
    },
    {
        "id": "de5dca1eb067a3b7",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "IAA36",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 725,
        "y": 200,
        "wires": []
    },
    {
        "id": "1648d158a8b632da",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iaa36on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 330,
        "wires": [
            [
                "b79643eb37123cb1",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "7715bc0e41d7ecb8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"*iaa36off_fullwork#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 365,
        "wires": [
            [
                "55bc4f9fde4cbc30",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "55bc4f9fde4cbc30",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 158",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 330,
        "wires": []
    },
    {
        "id": "ed3a19357d7e38ca",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 159",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 380,
        "wires": []
    },
    {
        "id": "282514c30c2ce1cd",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"*iaa36on_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 420,
        "wires": [
            [
                "ed3a19357d7e38ca",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "8c69c205dfd53c26",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 160",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 420,
        "wires": []
    },
    {
        "id": "39dbc1988cccc2df",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"*iaa36off_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 455,
        "wires": [
            [
                "8c69c205dfd53c26",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "8bc0b823e0c0c1d7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"*iaa36off_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 550,
        "wires": [
            [
                "d8017e33da9947e4",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "4ed0320b2d036599",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"*iaa36on_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 515,
        "wires": [
            [
                "913358dec698d3d4",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "0ccd4bb989d9ad9e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iaa36on_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 610,
        "wires": [
            [
                "50baf44da60ac7eb",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "78ae16f5e2f80aac",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iaa36off_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 645,
        "wires": [
            [
                "d3d7c4063520d38a",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "913358dec698d3d4",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 161",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 470,
        "wires": []
    },
    {
        "id": "d8017e33da9947e4",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 162",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 510,
        "wires": []
    },
    {
        "id": "50baf44da60ac7eb",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 163",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 560,
        "wires": []
    },
    {
        "id": "d3d7c4063520d38a",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 164",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 600,
        "wires": []
    },
    {
        "id": "d19aa6de332ce723",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"*iaa36on_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 805,
        "wires": [
            [
                "1cf4a136070a60c8",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "41d5a651f65cbed8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"*iaa36off_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 840,
        "wires": [
            [
                "9e7d33e34bdf155e",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "1cf4a136070a60c8",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 165",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 745,
        "wires": []
    },
    {
        "id": "9e7d33e34bdf155e",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 166",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 785,
        "wires": []
    },
    {
        "id": "0a04e0a9d4647adc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"*iaa36on_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 705,
        "wires": [
            [
                "3c95339ce2f6b0e6",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "48ba7f441b59777b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"*iaa36off_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 740,
        "wires": [
            [
                "25fcab4f9103a36f",
                "cf5677f457c21395"
            ]
        ]
    },
    {
        "id": "3c95339ce2f6b0e6",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 167",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 955,
        "y": 655,
        "wires": []
    },
    {
        "id": "25fcab4f9103a36f",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 168",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 955,
        "y": 695,
        "wires": []
    },
    {
        "id": "e59080f9753c1639",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing IAA35",
        "func": "\nif(msg.payload[1] === \"iaa35\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 540,
        "y": 935,
        "wires": [
            [
                "21360acb35c1808a",
                "2ea51bf573d42ba7",
                "411ccbd04cae343d",
                "7b9789e688d70870",
                "8c842c251d81181a",
                "18f40c8a82ee3c1c",
                "93ff246e0010c825",
                "ba2569cb4dad116d",
                "e8011c4a6d194827",
                "86c352220d1920d2",
                "e9ffb00d3087da6b",
                "4b0d6a4fb56a468e",
                "cb54cedf77f4e6b7",
                "64791adcfbe9ed4c",
                "b5d6da6b45ac5852"
            ]
        ]
    },
    {
        "id": "25ef0a908c42d974",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 169",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 965,
        "wires": []
    },
    {
        "id": "21360acb35c1808a",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 170",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 930,
        "wires": []
    },
    {
        "id": "bcc9672e9f2eb677",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 171",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1040,
        "wires": []
    },
    {
        "id": "2ea51bf573d42ba7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iaa35on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 990,
        "wires": [
            [
                "25ef0a908c42d974",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "411ccbd04cae343d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"*iaa35off_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1025,
        "wires": [
            [
                "945f3b2e76172b60",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "945f3b2e76172b60",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 172",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1000,
        "wires": []
    },
    {
        "id": "6349302ee363da80",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "IAA35",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 720,
        "y": 950,
        "wires": []
    },
    {
        "id": "7b9789e688d70870",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iaa35on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1080,
        "wires": [
            [
                "bcc9672e9f2eb677",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "8c842c251d81181a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"*iaa35off_fullwork#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1115,
        "wires": [
            [
                "34a59b62f1b97933",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "34a59b62f1b97933",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 173",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1080,
        "wires": []
    },
    {
        "id": "71c07d0aaf905193",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 174",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1130,
        "wires": []
    },
    {
        "id": "18f40c8a82ee3c1c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"*iaa35on_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1170,
        "wires": [
            [
                "71c07d0aaf905193",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "52fec972e5af1632",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 175",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1170,
        "wires": []
    },
    {
        "id": "93ff246e0010c825",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"*iaa35off_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1205,
        "wires": [
            [
                "52fec972e5af1632",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "e8011c4a6d194827",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"*iaa35off_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1300,
        "wires": [
            [
                "d0aee4e2ffd25448",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "ba2569cb4dad116d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"*iaa35on_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1265,
        "wires": [
            [
                "dd7319397d6bccc0",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "86c352220d1920d2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iaa35on_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1360,
        "wires": [
            [
                "f8851679c8482eb1",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "e9ffb00d3087da6b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iaa35off_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1395,
        "wires": [
            [
                "e21e6933d48b1efe",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "dd7319397d6bccc0",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 176",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1220,
        "wires": []
    },
    {
        "id": "d0aee4e2ffd25448",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 177",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1260,
        "wires": []
    },
    {
        "id": "f8851679c8482eb1",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 178",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1310,
        "wires": []
    },
    {
        "id": "e21e6933d48b1efe",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 179",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1350,
        "wires": []
    },
    {
        "id": "4b0d6a4fb56a468e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"*iaa35on_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1555,
        "wires": [
            [
                "1473c01275019d73",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "cb54cedf77f4e6b7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"*iaa35off_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1590,
        "wires": [
            [
                "3541edea5dab43d7",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "1473c01275019d73",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 180",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1495,
        "wires": []
    },
    {
        "id": "3541edea5dab43d7",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 181",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 1535,
        "wires": []
    },
    {
        "id": "64791adcfbe9ed4c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"*iaa35on_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 1455,
        "wires": [
            [
                "01a30a9c2f4baa35",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "b5d6da6b45ac5852",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"*iaa35off_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 1490,
        "wires": [
            [
                "278f801b8c9150d9",
                "5249dbe54312ce1d"
            ]
        ]
    },
    {
        "id": "01a30a9c2f4baa35",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 182",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 950,
        "y": 1405,
        "wires": []
    },
    {
        "id": "278f801b8c9150d9",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 183",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 950,
        "y": 1445,
        "wires": []
    },
    {
        "id": "b90bd5630b69c52a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing IAA33",
        "func": "\nif(msg.payload[1] === \"iaa33\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 545,
        "y": 1705,
        "wires": [
            [
                "9bf0670aeeb65ba6",
                "219a9e3990a3cb4b",
                "71519235177ba3ec",
                "2150d1e563ea1722",
                "24563eeba2d665ba",
                "2d19ef53584b3a95",
                "b0e3d0b021f91280",
                "ee5ff6c24a15ffc7",
                "b1807b9ae1de5aa5",
                "24fb24a4ce86a9f1",
                "ea7b9d8b2abb5132",
                "db9aa3b345c97c5c",
                "c18e658dc58d2355",
                "f7e9b46a686d8446",
                "b8ea352a2faace85"
            ]
        ]
    },
    {
        "id": "bb1d3e9b870ff311",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 184",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1735,
        "wires": []
    },
    {
        "id": "9bf0670aeeb65ba6",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 185",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1700,
        "wires": []
    },
    {
        "id": "e779adc93dcb26d2",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 186",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1810,
        "wires": []
    },
    {
        "id": "219a9e3990a3cb4b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iaa33on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 1760,
        "wires": [
            [
                "bb1d3e9b870ff311",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "71519235177ba3ec",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"*iaa33off_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 1795,
        "wires": [
            [
                "4845d33be693ca3b",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "4845d33be693ca3b",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 187",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1770,
        "wires": []
    },
    {
        "id": "362cf3118ed072c8",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "IAA33",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 725,
        "y": 1720,
        "wires": []
    },
    {
        "id": "2150d1e563ea1722",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iaa33on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 1850,
        "wires": [
            [
                "e779adc93dcb26d2",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "24563eeba2d665ba",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"*iaa33off_fullwork#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 1885,
        "wires": [
            [
                "53f6efd0e740e6ce",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "53f6efd0e740e6ce",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 188",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1850,
        "wires": []
    },
    {
        "id": "e29b8d674c5490a0",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 189",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1900,
        "wires": []
    },
    {
        "id": "2d19ef53584b3a95",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"*iaa33on_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 1940,
        "wires": [
            [
                "e29b8d674c5490a0",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "e4798e772b197cad",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 190",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1940,
        "wires": []
    },
    {
        "id": "b0e3d0b021f91280",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"*iaa33off_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 1975,
        "wires": [
            [
                "e4798e772b197cad",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "b1807b9ae1de5aa5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"*iaa33off_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 2070,
        "wires": [
            [
                "4d772424d3748750",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "ee5ff6c24a15ffc7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"*iaa33on_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 2035,
        "wires": [
            [
                "232da8206451e975",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "24fb24a4ce86a9f1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iaa33on_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 2130,
        "wires": [
            [
                "20a8733335461cb9",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "ea7b9d8b2abb5132",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iaa33off_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 2165,
        "wires": [
            [
                "89c51409e2054237",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "232da8206451e975",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 191",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 1990,
        "wires": []
    },
    {
        "id": "4d772424d3748750",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 192",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2030,
        "wires": []
    },
    {
        "id": "20a8733335461cb9",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 193",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2080,
        "wires": []
    },
    {
        "id": "89c51409e2054237",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 194",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2120,
        "wires": []
    },
    {
        "id": "db9aa3b345c97c5c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"*iaa33on_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 2325,
        "wires": [
            [
                "cfc8344bdb9cb37b",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "c18e658dc58d2355",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"*iaa33off_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 2360,
        "wires": [
            [
                "c55d17018738eabf",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "cfc8344bdb9cb37b",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 195",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2265,
        "wires": []
    },
    {
        "id": "c55d17018738eabf",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 196",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2305,
        "wires": []
    },
    {
        "id": "f7e9b46a686d8446",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"*iaa33on_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2225,
        "wires": [
            [
                "12bfa548d2f51ba1",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "b8ea352a2faace85",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"*iaa33off_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2260,
        "wires": [
            [
                "cfda06eb5f473905",
                "1783ae375acf7ba3"
            ]
        ]
    },
    {
        "id": "12bfa548d2f51ba1",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 197",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 955,
        "y": 2175,
        "wires": []
    },
    {
        "id": "cfda06eb5f473905",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 198",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 955,
        "y": 2215,
        "wires": []
    },
    {
        "id": "8be2b670954ac861",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*^iam72^data^#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*^iam80^0^0^0^#",
        "payloadType": "str",
        "x": 185,
        "y": 540,
        "wires": [
            [
                "891c5f8559147b96"
            ]
        ]
    },
    {
        "id": "44ffa5b3556ae015",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing IAM72",
        "func": "\nif(msg.payload[1] === \"iam72\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 545,
        "y": 2475,
        "wires": [
            [
                "54c0462bba905807",
                "87e13f21187e3814",
                "9c321c891ae0e4c5",
                "881c2aedd777ef58",
                "ec5656a4d971da66",
                "b94b619247806af1",
                "a30bbc81219d8a68"
            ]
        ]
    },
    {
        "id": "5afc3d1ff24e825c",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 199",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2505,
        "wires": []
    },
    {
        "id": "54c0462bba905807",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 200",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2470,
        "wires": []
    },
    {
        "id": "87e13f21187e3814",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iam72on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 2530,
        "wires": [
            [
                "5afc3d1ff24e825c",
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "9c321c891ae0e4c5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*iam72off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 2565,
        "wires": [
            [
                "870ae0a7606862df",
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "870ae0a7606862df",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 201",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2540,
        "wires": []
    },
    {
        "id": "80ac0431058cb748",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "IAM72",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 725,
        "y": 2490,
        "wires": []
    },
    {
        "id": "881c2aedd777ef58",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iam72on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 2625,
        "wires": [
            [
                "b9e8c46cdb558211",
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "ec5656a4d971da66",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*iam72off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 2660,
        "wires": [
            [
                "cb6da1f133bf1fef",
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "b9e8c46cdb558211",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 202",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2575,
        "wires": []
    },
    {
        "id": "cb6da1f133bf1fef",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 203",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2610,
        "wires": []
    },
    {
        "id": "b94b619247806af1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iam72on_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 2720,
        "wires": [
            [
                "916d0bc47ad96efd",
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "a30bbc81219d8a68",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iam72off_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 2755,
        "wires": [
            [
                "81e0451ef2f917b7",
                "f1b41ee91929582a"
            ]
        ]
    },
    {
        "id": "81e0451ef2f917b7",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 204",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2680,
        "wires": []
    },
    {
        "id": "916d0bc47ad96efd",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 205",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 2645,
        "wires": []
    },
    {
        "id": "c124b57d14ccfc64",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing IAM73",
        "func": "\nif(msg.payload[1] === \"iam73\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 540,
        "y": 2860,
        "wires": [
            [
                "463fa21c738e8e46",
                "71a33052dd38e3b9",
                "aab05154408e154d",
                "bcd50bd8f556e306",
                "5544922fbec888dc",
                "4039e0c2747b2443",
                "2b31b90e958669e3"
            ]
        ]
    },
    {
        "id": "89d7c950a703bb92",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 206",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 2890,
        "wires": []
    },
    {
        "id": "463fa21c738e8e46",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 207",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 2855,
        "wires": []
    },
    {
        "id": "71a33052dd38e3b9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iam73on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2915,
        "wires": [
            [
                "89d7c950a703bb92",
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "aab05154408e154d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*iam73off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2950,
        "wires": [
            [
                "9861e17ab739d8ef",
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "9861e17ab739d8ef",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 208",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 2925,
        "wires": []
    },
    {
        "id": "4a365975d6df4300",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "IAM73",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 720,
        "y": 2875,
        "wires": []
    },
    {
        "id": "bcd50bd8f556e306",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iam73on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3010,
        "wires": [
            [
                "186d3e937c83cbd5",
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "5544922fbec888dc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*iam73off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3045,
        "wires": [
            [
                "65cac6d43b969a68",
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "186d3e937c83cbd5",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 209",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 2960,
        "wires": []
    },
    {
        "id": "65cac6d43b969a68",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 210",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 2995,
        "wires": []
    },
    {
        "id": "4039e0c2747b2443",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iam73on_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3105,
        "wires": [
            [
                "33fa169f6efc823b",
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "2b31b90e958669e3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iam73off_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3140,
        "wires": [
            [
                "7dade46c7a93d90c",
                "14d1d8d3775e7542"
            ]
        ]
    },
    {
        "id": "7dade46c7a93d90c",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 211",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 3065,
        "wires": []
    },
    {
        "id": "33fa169f6efc823b",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 212",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 3030,
        "wires": []
    },
    {
        "id": "3362d719edab9a4c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing IAM80",
        "func": "\nif(msg.payload[1] === \"iam80\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 535,
        "y": 3260,
        "wires": [
            [
                "37ba89813927546f",
                "de74a6423f7c2c6c",
                "3c94ad252d494f2c",
                "5c6be97154cd9c77",
                "bbd3b6dd64956b63",
                "020c8d85f7c10ac9",
                "797112538aadb822"
            ]
        ]
    },
    {
        "id": "e141c6b316d1b6ad",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 213",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3290,
        "wires": []
    },
    {
        "id": "37ba89813927546f",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 214",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3255,
        "wires": []
    },
    {
        "id": "de74a6423f7c2c6c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iam80on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3315,
        "wires": [
            [
                "e141c6b316d1b6ad",
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "3c94ad252d494f2c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*iam80off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3350,
        "wires": [
            [
                "f71c5ba38de8ccc7",
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "f71c5ba38de8ccc7",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 215",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3325,
        "wires": []
    },
    {
        "id": "21989b8a59bcbdf2",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "IAM80",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 715,
        "y": 3275,
        "wires": []
    },
    {
        "id": "5c6be97154cd9c77",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iam80on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3410,
        "wires": [
            [
                "3a1ffe873cba38e3",
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "bbd3b6dd64956b63",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*iam80off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3445,
        "wires": [
            [
                "0c5165927b35f254",
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "3a1ffe873cba38e3",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 216",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3360,
        "wires": []
    },
    {
        "id": "0c5165927b35f254",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 217",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3395,
        "wires": []
    },
    {
        "id": "020c8d85f7c10ac9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iam80on_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 3505,
        "wires": [
            [
                "32bec7e62dec7e80",
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "797112538aadb822",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iam80off_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 3540,
        "wires": [
            [
                "8aade551c33a9e73",
                "7afe618c77689441"
            ]
        ]
    },
    {
        "id": "8aade551c33a9e73",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 218",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3465,
        "wires": []
    },
    {
        "id": "32bec7e62dec7e80",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 219",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 935,
        "y": 3430,
        "wires": []
    },
    {
        "id": "c0e156c061255a40",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "parsing ISPBR3",
        "func": "\nif(msg.payload[1] === \"ispbr3\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 545,
        "y": 3690,
        "wires": [
            [
                "b384c2d554c111a3",
                "37eaa2817756712d",
                "f771188a385ee4c3",
                "75e51c7ea8de60a9",
                "455569c1236b89a8"
            ]
        ]
    },
    {
        "id": "e1daa22987cb5a19",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 220",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 3720,
        "wires": []
    },
    {
        "id": "b384c2d554c111a3",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 221",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 3685,
        "wires": []
    },
    {
        "id": "37eaa2817756712d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*ispbr3on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3745,
        "wires": [
            [
                "e1daa22987cb5a19",
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "f771188a385ee4c3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*ispbr3off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3780,
        "wires": [
            [
                "1d35b9e3c3226801",
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "1d35b9e3c3226801",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 222",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 3755,
        "wires": []
    },
    {
        "id": "ddd41b300f651889",
        "type": "comment",
        "z": "24034456db30f6e3",
        "name": "ISPBR3",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 725,
        "y": 3705,
        "wires": []
    },
    {
        "id": "75e51c7ea8de60a9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*ispbr3on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3840,
        "wires": [
            [
                "76c2f50b7dee51ae",
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "455569c1236b89a8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*ispbr3off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3875,
        "wires": [
            [
                "52871a332ef2584d",
                "720151b304a20c07"
            ]
        ]
    },
    {
        "id": "76c2f50b7dee51ae",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 223",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 3790,
        "wires": []
    },
    {
        "id": "52871a332ef2584d",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 224",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 945,
        "y": 3825,
        "wires": []
    },
    {
        "id": "4b6a798dd209e40b",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*^ispbr3^data^#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*^ispbr3^1^1^0^#",
        "payloadType": "str",
        "x": 185,
        "y": 585,
        "wires": [
            [
                "891c5f8559147b96"
            ]
        ]
    },
    {
        "id": "97640bc138584367",
        "type": "serial in",
        "z": "24034456db30f6e3",
        "name": "",
        "serial": "12345678",
        "x": 165,
        "y": 160,
        "wires": [
            [
                "891c5f8559147b96",
                "17678b1cef8a7c26",
                "6c4b90c793d25dac",
                "f307cf15e1daa00f",
                "1f5ead90d5c1d41f"
            ]
        ]
    },
    {
        "id": "107e750955f2c195",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 4385,
        "y": 1530,
        "wires": [
            []
        ]
    },
    {
        "id": "7d3404510b5bd1d3",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 4850,
        "y": 2370,
        "wires": [
            []
        ]
    },
    {
        "id": "ef4c96abf74bb067",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 225",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4375,
        "y": 2260,
        "wires": []
    },
    {
        "id": "6db2c6553815769a",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 226",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4375,
        "y": 2465,
        "wires": []
    },
    {
        "id": "fe388b2be0519818",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 227",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 3685,
        "y": 1035,
        "wires": []
    },
    {
        "id": "f6ab563a0c4989de",
        "type": "mqtt in",
        "z": "24034456db30f6e3",
        "name": "",
        "topic": "oee_status",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "df12309730285c8d",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 155,
        "y": 235,
        "wires": [
            [
                "33875f3e743816f2"
            ]
        ]
    },
    {
        "id": "33875f3e743816f2",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 228",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 365,
        "y": 255,
        "wires": []
    },
    {
        "id": "62990f32ac22a85e",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_35",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "18c7aa0014d44912",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_33",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "7dcb3745c1f6d11e",
        "type": "MySQLdatabase",
        "name": "database_tps_oee_iam_73",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_73",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "51e6297883dcba65",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_72",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "f3c84c2a50e35eda",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_36",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "79205502032234cb",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_80",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "d9976337d8f1a2e5",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_ispbr3",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "12345678",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
        "serialbaud": "9600",
        "databits": "8",
        "parity": "none",
        "stopbits": "1",
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "out": "char",
        "addchar": "",
        "responsetimeout": "500"
    },
    {
        "id": "90f875a253a55c6f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_roller_arm",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "df12309730285c8d",
        "type": "mqtt-broker",
        "name": "",
        "broker": "10.42.0.1",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    }
]
