<template>
  <v-card min-width="800px">
    <v-card-actions class="px-5 pt-5 buttons-groups">
      <v-sheet>
        <v-btn
          @click="closeDialog"
          variant="flat"
          size="small"
          color="blue-darken-3"
        >
          <v-icon icon="fas fa-angle-left" />
        </v-btn>
        <v-btn
          @click="toggleScale"
          variant="flat"
          size="small"
          color="orange-darken-4"
        >
          <v-icon :icon="`fas fa-${tempUnit === 'c' ? 'f' : 'c'}`" />
          <v-tooltip
            activator="parent"
            :text="
              currentLanguage === 'en'
                ? `Change to ${tempUnit === 'c' ? 'fahrenheit' : 'celsius'}`
                : currentLanguage === 'bd'
                ? `${
                    tempUnit === 'c' ? 'ফারেনহাইট' : 'সেলসিয়াস'
                  } স্কেলে পরিবর্তন করুন`
                : `${tempUnit === 'c' ? '華氏' : '摂氏'}スケールに変更`
            "
          />
        </v-btn>
      </v-sheet>
      <v-sheet>
        <v-btn
          disabled
          size="small"
          variant="flat"
          color="blue-darken-3"
          v-if="addCityLoading"
        >
          {{
            currentLanguage === 'jp'
              ? '読み込み中...'
              : currentLanguage === 'bd'
              ? 'লোড হচ্ছে...'
              : 'Loading...'
          }}
        </v-btn>
        <v-btn
          size="small"
          variant="flat"
          color="blue-darken-3"
          v-if="
            !addCityLoading && !allCitiesName.includes(weather.location.name)
          "
          @click="addCity"
        >
          <v-icon icon="fas fa-plus" />
          <span class="ml-2">
            {{
              currentLanguage === 'jp'
                ? '追加'
                : currentLanguage === 'bd'
                ? 'সংযুক্ত করুন'
                : 'Add'
            }}
          </span>
        </v-btn>

        <remove-button-dialog
          :text="
            currentLanguage === 'jp'
              ? `本当にホームページから${weather.location.name}を削除しますか？`
              : currentLanguage === 'bd'
              ? `আপনি কি নিশ্চিত যে আপনি আপনার হোমপেজ থেকে ${weather.location.name} আপসারন করতে চাচ্ছেন?`
              : `Do you really want to remove ${weather.location.name} from your homepage?`
          "
          :on-remove-handler="removeCity"
        >
          <v-btn
            size="small"
            variant="flat"
            color="red-darken-3"
            v-if="
              isDeleteAble &&
              allCitiesName
                .filter((c) => c !== 'Dhaka' && c !== 'Miyazaki')
                .includes(weather.location.name)
            "
          >
            <v-icon icon="fas fa-trash" />
            <span class="ml-2">{{
              currentLanguage === 'jp'
                ? '取り除く'
                : currentLanguage === 'bd'
                ? 'অপসারণ করুন'
                : 'Remove'
            }}</span>
          </v-btn>
        </remove-button-dialog>
      </v-sheet>
    </v-card-actions>
    <v-card-text class="pb-5">
      <template v-if="isLoading">
        <v-skeleton-loader
          :loading="isLoading"
          height="150"
        ></v-skeleton-loader>
        <br />
        <v-skeleton-loader
          :loading="isLoading"
          height="100"
        ></v-skeleton-loader>
        <br />
        <v-skeleton-loader :loading="isLoading" height="50"></v-skeleton-loader>
      </template>
      <template v-else>
        <v-sheet class="button-pills-group mb-10">
          <weather-pill-button
            v-for="item in weathers"
            :key="item.current.date"
            :item="item"
            :active="active.current.date === item.current.date"
            :on-click-handler="changeActiveState"
          />
        </v-sheet>
        <div class="test">
          <weather-card-header-info
            :location="active.location"
            :date="new Date(active.current.date)"
          />
          <div class="group-of-icon-pills">
            <weather-icon-pill
              icon="fas fa-sun"
              :title="
                currentLanguage === 'en'
                  ? 'Sunrise'
                  : currentLanguage === 'bd'
                  ? 'সূর্যোদয়'
                  : '日の出'
              "
              :value="
                getConvertedTime(active.current.astro.sunrise, currentLanguage)
              "
            />
            <weather-icon-pill
              icon="far fa-sun"
              :title="
                currentLanguage === 'en'
                  ? 'Sunset'
                  : currentLanguage === 'bd'
                  ? 'সূর্যাস্ত'
                  : '日没'
              "
              :value="
                getConvertedTime(active.current.astro.sunset, currentLanguage)
              "
            />
            <weather-icon-pill
              icon="fas fa-moon fa-rotate-270"
              :title="
                currentLanguage === 'en'
                  ? 'Moonrise'
                  : currentLanguage === 'bd'
                  ? 'চন্দ্রোদয়'
                  : '月の出'
              "
              :value="
                getConvertedTime(active.current.astro.moonrise, currentLanguage)
              "
            />
            <weather-icon-pill
              icon="far fa-moon fa-rotate-270"
              :title="
                currentLanguage === 'en'
                  ? 'Moonset'
                  : currentLanguage === 'bd'
                  ? 'চন্দ্রাস্ত'
                  : '月の入り'
              "
              :value="
                getConvertedTime(active.current.astro.moonset, currentLanguage)
              "
            />
          </div>
        </div>
        <temperature
          :condition="active.current.condition"
          :is-celsius="tempUnit === 'c'"
          :temp="active.current.temp"
          :feels-like="active.current.feelsLike"
        />

        <v-row class="pa-5 d-block">
          <div class="my-2">
            <icon-text
              :content="{
                en: `${active.current.humidity}&percnt; humidity in the air`,
                bd: `আর্দ্রতা ${active.current.humidity}&percnt;`,
                jp: `湿度${active.current.humidity}&percnt;`,
              }"
              icon="fas fa-water"
            />
          </div>
          <div class="my-2">
            <icon-text
              :content="{
                en: `Visibility ${active.current.visibility} km`,
                bd: `দৃশ্যমানতা ${active.current.visibility} কিলোমিটার`,
                jp: `可視性${active.current.visibility}キロメートル`,
              }"
              icon="fas fa-eye"
            />
          </div>
        </v-row>

        <v-row class="py-2 px-5">
          <p class="mb-3 font-weight-bold text-primary">
            {{
              currentLanguage === 'jp'
                ? '空気の質'
                : currentLanguage === 'bd'
                ? 'বায়ুর গুণমান'
                : 'Air Quality'
            }}
          </p>
          <v-card class="w-100">
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="pt-2 text-center font-weight-bold">
                    {{
                      currentLanguage === 'jp'
                        ? '一酸化炭素'
                        : currentLanguage === 'bd'
                        ? 'কার্বন মনোক্সাইড'
                        : 'Carbon Monoxide'
                    }}
                    (CO)
                  </th>
                  <th class="pt-2 text-center font-weight-bold">
                    {{
                      currentLanguage === 'jp'
                        ? '二酸化窒素'
                        : currentLanguage === 'bd'
                        ? 'নাইট্রোজেন ডাই অক্সাইড'
                        : 'Nitrogen Dioxide'
                    }}
                    (NO<sub>2</sub>)
                  </th>
                  <th class="pt-2 text-center font-weight-bold">
                    {{
                      currentLanguage === 'jp'
                        ? 'オゾン'
                        : currentLanguage === 'bd'
                        ? 'ওজোন'
                        : 'Ozone'
                    }}
                    (O<sub>3</sub>)
                  </th>
                  <th class="pt-2 text-center font-weight-bold">
                    {{
                      currentLanguage === 'jp'
                        ? '二酸化硫黄'
                        : currentLanguage === 'bd'
                        ? 'সালফার ডাই অক্সাইড'
                        : 'Sulfur dioxide'
                    }}
                    (SO<sub>2</sub>)
                  </th>
                  <th class="pt-2 text-center font-weight-bold">
                    PM<sub>2.5</sub>
                  </th>
                  <th class="pt-2 text-center font-weight-bold">
                    PM<sub>10</sub>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pt-2 text-center">
                    {{ active.current.airQuality.co?.toFixed(2) || '-' }}
                  </td>
                  <td class="pt-2 text-center">
                    {{ active.current.airQuality.no2?.toFixed(2) || '-' }}
                  </td>
                  <td class="pt-2 text-center">
                    {{ active.current.airQuality.o3?.toFixed(2) || '-' }}
                  </td>
                  <td class="pt-2 text-center">
                    {{ active.current.airQuality.so2?.toFixed(2) || '-' }}
                  </td>
                  <td class="pt-2 text-center">
                    {{ active.current.airQuality.pm2_5?.toFixed(2) || '-' }}
                  </td>
                  <td class="pt-2 text-center">
                    {{ active.current.airQuality.pm10?.toFixed(2) || '-' }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-row>

        <hr class="w-100 my-5" style="opacity: 0.4" />

        <v-row class="pa-5">
          <p class="mb-3 font-weight-bold text-primary">
            {{
              currentLanguage === 'jp'
                ? '現在のステータス'
                : currentLanguage === 'bd'
                ? 'বর্তমান অবস্থা'
                : 'Current Status'
            }}
          </p>
          <v-card class="pa-2 w-100">
            <div class="current-weather-information px-5">
              <div>
                <icon-text
                  :content="{
                    en: `Wind speed ${weather.current.wind.speed} km/h from the direction of ${weather.current.wind.direction}`,
                    bd: `${weather.current.wind.direction} দিক থেকে ${weather.current.wind.speed} কিলোমিটার বেগে বাতাস বেয়ে চলছে`,
                    jp: `時速${weather.current.wind.speed}キロメートル、${weather.current.wind.direction}から方向`,
                  }"
                  icon="fas fa-wind"
                />
              </div>
              <div>
                <icon-text
                  :content="{
                    en: `${weather.current.cloud}&percnt; of the sky is cloudy`,
                    bd: `${weather.current.cloud}&percnt; আকাশ মেঘাচ্ছন্ন হয়ে আছে`,
                    jp: `空の${weather.current.cloud}&percnt;が曇っています`,
                  }"
                  icon="fas fa-cloud"
                />
              </div>
              <div>
                <icon-text
                  :content="{
                    en: `${weather.current.pressure} millibar pressure in the air`,
                    bd: `বাতাসে চাপ ${weather.current.pressure} মিলিবার`,
                    jp: `空気圧${weather.current.pressure}ミリバール`,
                  }"
                  icon="fas fa-atom"
                />
              </div>
            </div>
          </v-card>
        </v-row>

        <hr class="w-100 my-5" style="opacity: 0.4" />

        <v-row class="my-10 p-all-1rem">
          <line-chart
            :height="200"
            v-if="chartDataset !== null"
            :chart-id="
              weather.location.name + new Date() + Math.random() + Math.random()
            "
            :chartData="chartDataset"
            :is-celsius="tempUnit === 'c'"
          ></line-chart>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { format } from 'date-fns';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import generateChartDataset from '../../../utils/chart-dataset';
import RemoveButtonDialog from '../buttons/RemoveButtonDialog.vue';
import IconText from '../icon-text/IconText.vue';
import LineChart from '../temp-chart/LineChart.vue';
import Temperature from './Temperature.vue';
import WeatherCardHeaderInfo from './WeatherCardHeaderInfo.vue';
import WeatherIconPill from './WeatherIconPill.vue';
import WeatherPillButton from './WeatherPillButton.vue';

const store = useStore();
const toast = useToast();

const props = defineProps({
  closeDialog: {
    type: Function,
    required: true,
  },
  weather: {
    type: Object,
    required: true,
  },
  isDeleteAble: {
    type: Boolean,
    default: true,
  },
});

const weathers = ref({});
const active = ref({});
const tempUnit = ref('c');
const isLoading = ref(true);
const chartDataset = ref(null);
const addCityLoading = ref(false);

const pushToWethersObj = (date, obj) => {
  weathers.value[date] = obj;
};

onMounted(() => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const currentObj = {
    current: {
      ...props.weather.current,
      date: today,
    },
    location: props.weather.location,
  };
  pushToWethersObj(today, currentObj);
  active.value = currentObj;
  for (let i = 1; i < props.weather.forecasts.length; i++) {
    const obj = {
      current: {
        ...props.weather.forecasts[i],
        temp: props.weather.forecasts[i].temp.avg,
      },
      location: props.weather.location,
    };
    pushToWethersObj(obj.current.date, obj);
  }
  chartDataset.value = generateChartDataset([...props.weather.forecasts]);
  isLoading.value = false;
});

const removeCity = () => {
  try {
    store.dispatch('removeACity', props.weather.location.name);
    toast.success(
      currentLanguage.value === 'jp'
        ? '市の撤去に成功'
        : currentLanguage.value === 'bd'
        ? 'শহর সফলভাবে অপসারণ করা হয়েছে'
        : 'City removed successfully'
    );
  } catch (e) {
    toast.error(e.message);
  }
};

const addCity = async () => {
  try {
    addCityLoading.value = true;
    await store.dispatch('addNewCity', props.weather.location.name);
    toast.success(
      currentLanguage.value === 'jp'
        ? '都市の追加に成功'
        : currentLanguage.value === 'bd'
        ? 'শহরটি সফলভাবে ঘুক্ত করা হয়েছে'
        : 'Successfully added the city'
    );
  } catch (e) {
    toast.error(e.message);
  } finally {
    addCityLoading.value = false;
  }
};

const chartData = computed(() => {
  const data = {
    labels: chartData.value.labels,
  };
  if (tempUnit === 'c') {
    data.datasets = chartData.value.c;
  } else {
    data.datasets = chartData.value.f;
  }
  return data;
});

const allCitiesName = computed(() => store.getters.getAllCitiesName);

const toggleScale = () => {
  tempUnit.value = tempUnit.value === 'c' ? 'f' : 'c';
};

const changeActiveState = (date) => {
  active.value = weathers.value[date];
};

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

const getConvertedTime = (time, lang) => {
  const timeArr = time.split(' ');
  const map = {
    am: {
      bd: 'পূর্বাহ্ন',
      ja: '午前',
    },
    pm: {
      bd: 'অপরাহ্ন',
      ja: '午後',
    },
  };
  if (lang === 'en') {
    return time;
  } else if (lang === 'bd') {
    return `${timeArr[0]} ${map[timeArr[1].toLowerCase()].bd}`;
  } else {
    return `${timeArr[0]} ${map[timeArr[1].toLowerCase()].ja}`;
  }
};
</script>

<style scoped>
.current-weather-information {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.test {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buttons-groups {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-pills-group {
  display: flex;
  gap: 1rem !important;
}

.group-of-icon-pills {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
