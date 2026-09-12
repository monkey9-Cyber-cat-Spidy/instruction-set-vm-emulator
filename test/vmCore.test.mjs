import { test, describe } from 'node:test';
import assert from 'node:assert';
import { VirtualMachine } from '../src/vmCore.mjs';

describe('Instruction Set VM Emulator Suite', () => {
  const vm = new VirtualMachine();

  test('should execute LOAD_IMM and ADD opcodes in registers correctly', () => {
    // R0 = 15; R1 = 25; R0 += R1; HALT
    const program = [
      0x01, 0, 15,
      0x01, 1, 25,
      0x02, 0, 1,
      0xFF
    ];

    const state = vm.execute(program);
    assert.strictEqual(state.registers[0], 40);
    assert.strictEqual(state.registers[1], 25);
  });
});
