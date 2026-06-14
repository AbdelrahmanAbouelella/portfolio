/**
 * Dev-only smoke test for the local assistant engine.
 * Run with:  npx tsx scripts/assistant.test.ts
 * Not part of the production build.
 */
import { runAssistantSelfTest } from '../src/lib/assistant';

const failures = runAssistantSelfTest();

if (failures.length === 0) {
  console.log('✓ assistant self-test passed — all scenarios routed correctly.');
  process.exit(0);
} else {
  console.error(`✗ assistant self-test: ${failures.length} failing case(s):`);
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
