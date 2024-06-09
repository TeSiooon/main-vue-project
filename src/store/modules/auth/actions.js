export default {
  async login(context, payload) {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBH2-PwTEqMNLKrrTINwbz0MS9yeRUq5s',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      //error
      const error = new Error(resData.error.message || 'Failed');
      console.log(error);
      throw error;
    }

    console.log(resData);
    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn,
    });
  },
  async signup(context, payload) {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBH2-PwTEqMNLKrrTINwbz0MS9yeRUq5s',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      //error
      const error = new Error(resData.error.message || 'Failed');
      console.log(error);
      throw error;
    }

    console.log(resData);
    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn,
    });
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
