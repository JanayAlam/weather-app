import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import IconButton from '../shared/buttons/IconButton.vue';

describe('IconButton', () => {
  const wrapper = mount(IconButton, {
    propsData: {
      onClickHandler: () => {},
      title: 'This is title',
      icons: 'fas fa-trash',
    },
  });

  it('should receive right props', async () => {
    expect(IconButton).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();

    const props = wrapper.props();

    expect(props.title).toBe('This is title');
    expect(props.icons).toBe('fas fa-trash');
    expect(props.onClickHandler).toBeTruthy();
  });

  it('should mount all elements', () => {
    expect(wrapper.find('#icon-button-btn')).toBeTruthy();
    expect(wrapper.find('#icon-button-icon')).toBeTruthy();
    expect(wrapper.find('#icon-button-tooltip')).toBeTruthy();
  });
});
