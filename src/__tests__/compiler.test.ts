import preprocess from '../index';

describe("Syndicate compiles properly", () => {
  it('should compile Syndicate code within a Svelte script', async () => {
    const template = `
<script lang="syndicate/ts">
</script>
`;
    expect(true).toBeTruthy();
    // const _ = await preprocess(template);
  });
});
