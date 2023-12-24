import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import IconText from '../shared/icon-text/IconText.vue';
import store from './mocks/__store__.js';

describe('IconText', () => {
  const app = createApp(IconText);
  app.use(store);
  let wrapperStr;
  let wrapperObj;

  const icon = 'fas fa-trash';

  const contentStr = 'This is the content';
  const titleStr = 'This is title';

  const contentObj = {
    en: 'This is content for english',
    bd: 'This is content for bengali',
    jp: 'This is content for japanese',
  };

  const titleObj = {
    en: 'This is title for english',
    bd: 'This is title for bengali',
    jp: 'This is title for japanese',
  };

  beforeEach(() => {
    wrapperStr = mount(IconText, {
      props: {
        content: contentStr,
        icon,
        title: titleStr,
      },
      global: {
        plugins: [store],
      },
    });

    wrapperObj = mount(IconText, {
      props: {
        content: contentObj,
        icon,
        title: titleObj,
      },
      global: {
        plugins: [store],
      },
    });
  });

  it('should receive right props (strings)', () => {
    const props = wrapperStr.props();

    expect(props.content).toBeTruthy();
    expect(props.content).toBe(contentStr);
    expect(props.icon).toBeTruthy();
    expect(props.icon).toBe(icon);
    expect(props.title).toBeTruthy();
    expect(props.title).toBe(titleStr);
  });

  it('should render right values (strings)', () => {
    expect(wrapperStr.find('#icon-text-content')).toBeTruthy();
    expect(wrapperStr.find('#icon-text-content').wrapperElement.innerHTML).toBe(
      contentStr
    );
    expect(
      wrapperStr.find('#icon-text-tooltip').wrapperElement.getAttribute('text')
    ).toBe(titleStr);
  });

  it('should render right values for english language', async () => {
    await store.commit('CHANGE_LANGUAGE', 'en');

    expect(wrapperObj.find('#icon-text-content')).toBeTruthy();
    expect(wrapperObj.find('#icon-text-content').wrapperElement.innerHTML).toBe(
      contentObj.en
    );
    expect(wrapperObj.find('#icon-text-tooltip')).toBeTruthy();
    expect(
      wrapperObj.find('#icon-text-tooltip').wrapperElement.getAttribute('text')
    ).toBe(titleObj.en);
  });

  it('should render right values for bengali language', async () => {
    await store.commit('CHANGE_LANGUAGE', 'bd');

    expect(wrapperObj.find('#icon-text-content')).toBeTruthy();
    expect(wrapperObj.find('#icon-text-content').wrapperElement.innerHTML).toBe(
      contentObj.bd
    );
    expect(wrapperObj.find('#icon-text-tooltip')).toBeTruthy();
    expect(
      wrapperObj.find('#icon-text-tooltip').wrapperElement.getAttribute('text')
    ).toBe(titleObj.bd);
  });

  it('should render right values for japanese language', async () => {
    await store.commit('CHANGE_LANGUAGE', 'jp');

    expect(wrapperObj.find('#icon-text-content')).toBeTruthy();
    expect(wrapperObj.find('#icon-text-content').wrapperElement.innerHTML).toBe(
      contentObj.jp
    );
    expect(wrapperObj.find('#icon-text-tooltip')).toBeTruthy();
    expect(
      wrapperObj.find('#icon-text-tooltip').wrapperElement.getAttribute('text')
    ).toBe(titleObj.jp);
  });
});
