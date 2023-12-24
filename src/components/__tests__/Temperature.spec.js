import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import Temperature from '../shared/weather/Temperature.vue';
import store from './mocks/__store__.js';

describe('Clock', () => {
  const app = createApp(Temperature);
  app.use(store);
  let wrapperC;
  let wrapperF;

  const temp = {
    c: 15.5,
    f: 75.9,
  };

  const condition = {
    code: 1000,
    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
    text: {
      en: 'Sunny',
      bd: 'সূর্যোজ্জ্বল',
      jp: '晴れ',
    },
  };

  const feelsLike = {
    c: 12.1,
    f: 71.9,
  };

  beforeEach(() => {
    wrapperC = mount(Temperature, {
      props: {
        temp,
        condition,
        feelsLike,
      },
      global: {
        plugins: [store],
      },
    });
    wrapperF = mount(Temperature, {
      props: {
        isCelsius: false,
        temp,
        condition,
        feelsLike,
      },
      global: {
        plugins: [store],
      },
    });
  });

  it('should receive right props', () => {
    const props = wrapperC.props();

    expect(props.temp).toBeTruthy();
    expect(props.temp).toMatchObject(temp);
    expect(props.condition).toBeTruthy();
    expect(props.condition).toMatchObject(condition);
    expect(props.feelsLike).toBeTruthy();
    expect(props.feelsLike).toMatchObject(feelsLike);
  });

  it('should render temperature for celsius scale', () => {
    expect(wrapperC.find('#temperature-text').wrapperElement.innerHTML).toBe(
      `${temp.c}°C`
    );
  });

  it('should render temperature for fahrenheit scale', () => {
    expect(wrapperF.find('#temperature-text').wrapperElement.innerHTML).toBe(
      `${temp.f}°F`
    );
  });

  it('should render a clock for english language (celsius)', async () => {
    await store.commit('CHANGE_LANGUAGE', 'en');
    expect(
      wrapperC.find('#temperature-condition-text').wrapperElement.innerHTML
    ).toBe(condition.text.en);
    expect(
      wrapperC.find('#temperature-feels-like').wrapperElement.innerHTML
    ).toBe(`Feels like ${feelsLike.c}° celsius`);
  });

  it('should render a clock for bengali language (celsius)', async () => {
    await store.commit('CHANGE_LANGUAGE', 'bd');
    expect(
      wrapperC.find('#temperature-condition-text').wrapperElement.innerHTML
    ).toBe(condition.text.bd);
    expect(
      wrapperC.find('#temperature-feels-like').wrapperElement.innerHTML
    ).toBe(`${feelsLike.c} ডিগ্রি সেলসিয়াস অনুভূত হচ্ছে`);
  });

  it('should render a clock for japanese language (celsius)', async () => {
    await store.commit('CHANGE_LANGUAGE', 'jp');
    expect(
      wrapperC.find('#temperature-condition-text').wrapperElement.innerHTML
    ).toBe(condition.text.jp);
    expect(
      wrapperC.find('#temperature-feels-like').wrapperElement.innerHTML
    ).toBe(`${feelsLike.c}度摂氏くらいに感じます`);
  });

  it('should render a clock for english language (fahrenheit)', async () => {
    await store.commit('CHANGE_LANGUAGE', 'en');
    expect(
      wrapperF.find('#temperature-condition-text').wrapperElement.innerHTML
    ).toBe(condition.text.en);
    expect(
      wrapperF.find('#temperature-feels-like').wrapperElement.innerHTML
    ).toBe(`Feels like ${feelsLike.f}° fahrenheit`);
  });

  it('should render a clock for bengali language (fahrenheit)', async () => {
    await store.commit('CHANGE_LANGUAGE', 'bd');
    expect(
      wrapperF.find('#temperature-condition-text').wrapperElement.innerHTML
    ).toBe(condition.text.bd);
    expect(
      wrapperF.find('#temperature-feels-like').wrapperElement.innerHTML
    ).toBe(`${feelsLike.f} ডিগ্রি ফারেনহাইট অনুভূত হচ্ছে`);
  });

  it('should render a clock for japanese language (fahrenheit)', async () => {
    await store.commit('CHANGE_LANGUAGE', 'jp');
    expect(
      wrapperF.find('#temperature-condition-text').wrapperElement.innerHTML
    ).toBe(condition.text.jp);
    expect(
      wrapperF.find('#temperature-feels-like').wrapperElement.innerHTML
    ).toBe(`${feelsLike.f}度華氏くらいに感じます`);
  });
});
