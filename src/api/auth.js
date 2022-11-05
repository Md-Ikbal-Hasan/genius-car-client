export const setAuthToken = (user) => {

    const currentUser = { email: user.email };
    // get jwt toke
    fetch('https://genius-car-server-ten-xi.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then((res) => res.json())
        .then(data => {
            // local strage is the easiest but not the best place to store jwt token
            localStorage.setItem('genius-token', data.token);

        })
}