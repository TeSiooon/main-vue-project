export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coach = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };
    const res = await fetch(
      `https://react-kurs-771f0-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coach),
        'Content-Type': 'application/json',
      }
    );
    //const resData = await res.json();

    if (!res.ok) {
      //jakis tam error opis
    }

    //Nazwa metody z mutacji
    context.commit('registerCoach', { ...coach, id: userId });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const res = await fetch(
      `https://react-kurs-771f0-default-rtdb.firebaseio.com/coaches.json`
    );
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in resData) {
      const coach = {
        id: key,
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
