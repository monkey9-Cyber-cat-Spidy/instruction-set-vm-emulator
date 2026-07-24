export class VirtualMachine {
  constructor() {
    this.registers = [0, 0, 0, 0]; // R0, R1, R2, R3
    this.pc = 0; // Program Counter
    this.halted = false;
  }

  // Opcodes: 
  // LOAD_IMM (0x01, reg, val)
  // ADD (0x02, dest, src)
  // SUB (0x03, dest, src)
  // JMP (0x04, targetPc)
  // HALT (0xFF)
  execute(bytecode) {
    this.pc = 0;
    this.halted = false;

    while (this.pc < bytecode.length && !this.halted) {
      const opcode = bytecode[this.pc++];
      switch (opcode) {
        case 0x01: { // LOAD_IMM
          const reg = bytecode[this.pc++];
          const val = bytecode[this.pc++];
          this.registers[reg] = val;
          break;
        }
        case 0x02: { // ADD
          const dest = bytecode[this.pc++];
          const src = bytecode[this.pc++];
          this.registers[dest] += this.registers[src];
          break;
        }
        case 0x03: { // SUB
          const dest = bytecode[this.pc++];
          const src = bytecode[this.pc++];
          this.registers[dest] -= this.registers[src];
          break;
        }
        case 0xFF: // HALT
          this.halted = true;
          break;
        default:
          throw new Error(`Unknown opcode 0x${opcode.toString(16)} at PC ${this.pc - 1}`);
      }
    }

    return { registers: [...this.registers], pc: this.pc };
  }
}
