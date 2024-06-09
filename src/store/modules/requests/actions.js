export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      // coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    const res = await fetch(
      `https://react-kurs-771f0-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      //oblsuga bledu
      const error = new Error(resData.message || 'Failed to fethc');
      throw error;
    }
    newRequest.id = resData.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const res = await fetch(
      `https://react-kurs-771f0-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token,
      {
        method: 'GET',
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      //oblsuga bledu
      const error = new Error(resData.message || 'Failed to fetch requests');
      throw error;
    }

    const requests = [];

    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message,
      };

      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
