import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import RemoveButtonDialog from '../shared/buttons/RemoveButtonDialog.vue';
import store from './mocks/__store__.js';

describe('icon button test suite', () => {
  const app = createApp(RemoveButtonDialog);
  app.use(store);
  let wrapper;

  const text = 'This is the text';

  beforeEach(() => {
    wrapper = mount(RemoveButtonDialog, {
      props: {
        text,
        onRemoveHandler: () => {},
      },
      global: {
        plugins: [store],
      },
      computed: { currentLanguage: () => 'en' },
    });
  });

  it('should receive right props', async () => {
    expect(wrapper.props().text).toBe('This is the text');
    expect(wrapper.props().onRemoveHandler).toBeTruthy();
  });

  it('should mount all elements', () => {
    expect(wrapper.find('#remove-button-dialog-trigger-btn')).toBeTruthy();
    expect(wrapper.find('#remove-button-dialog-container')).toBeTruthy();
    expect(wrapper.find('#remove-button-dialog-text-container')).toBeTruthy();
  });

  it('should shows right text', () => {
    expect(
      wrapper.find('#remove-button-dialog-text-container').wrapperElement
        .innerHTML
    ).toBe(text);
  });
});
