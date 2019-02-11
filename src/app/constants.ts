export class Constants {
    static commands = {
        turnOn: new Int8Array([0xCC, 0x23, 0x33]),
        turnOff: new Int8Array([0xCC, 0x24, 0x33]),
    };

    static guids = {
        service: 0xFFD5,
        characteristic: 0xFFD9,
    };
}
