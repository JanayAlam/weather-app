import { onBeforeUnmount, onMounted } from 'vue';

const useGlobalKeyboardEvent = (key, callback) => {
  const handleKeyDown = (event) => {
    if (event.target.tagName.toLowerCase() !== 'input') {
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === key) {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
};

export default useGlobalKeyboardEvent;
