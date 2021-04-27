import { onMounted } from "vue";

export function useTracking(eventName = "default") {
   
  
    function trackEvent(ev: string, payload?: {}) {
      console.log(`track ${ev} event`);
  
    }
  
    onMounted(() => trackEvent(eventName));
  
    return {
      trackEvent,
    };
  }