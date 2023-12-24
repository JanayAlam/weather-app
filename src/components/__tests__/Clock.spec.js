import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import Clock from '../shared/clock-view/Clock.vue';
import store from './mocks/__store__.js';

describe('Clock', () => {
  const app = createApp(Clock);
  app.use(store);
  let wrapper;

  const tzId = 'Asia/Dhaka';

  beforeEach(() => {
    wrapper = mount(Clock, {
      props: {
        tzId,
      },
      data() {
        return {
          isLoading: false,
        };
      },
      global: {
        plugins: [store],
      },
    });
  });

  it('should receive right props', () => {
    const props = wrapper.props();

    expect(props.tzId).toBeTruthy();
    expect(props.tzId).toBe(tzId);
  });
});
