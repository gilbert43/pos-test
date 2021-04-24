export const http = (method=`GET`, data={},) => {

    const baseURL = `https://codechallenge.pikdrive.com/api`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    //   'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    };

    const body = JSON.stringify({
      ...data,
    });

    switch (method) {
        case `GET`:

            return (url) =>  fetch(`${baseURL}/${url}`, { method, headers,})
              .then(response => { 
                if(parseInt(response.status) > 300) {
                  return response.json().then(resp => {

                    return Promise.reject(resp);
                  });
                }

                return response.json().then(resp => {
                  return Promise.resolve(resp);
                });
              });

        case `POST`:
            return (url) =>fetch(`${baseURL}/${url}`, {method, headers, body,})
              .then(response => { 
                if(parseInt(response.status) > 300) {
                  return response.json().then(resp => {
                    window.alert(resp.message);
                    return Promise.reject(resp);
                  });
                }

                return response.json().then(resp => {
                  window.alert(resp.success);
                  return Promise.resolve(resp);
                });
               });

        case `DELETE`:

            return (url) => fetch(`${baseURL}/${url}`, {method,  headers, body,})
              .then(response => { 
                if(parseInt(response.status) > 300) {
                  return response.json().then(resp => {

                    return Promise.reject(resp);
                  });
                }

                return response.json().then(resp => {
                  return Promise.resolve(resp);
                }); 
               });

        case `PUT`:

            return (url) => fetch(`${baseURL}/${url}`, {method,  headers, body,})
              .then(response => { 
                if(parseInt(response.status) > 300) {
                  return response.json().then(resp => {

                    return Promise.reject(resp);
                  });
                }

                return response.json().then(resp => {
                  return Promise.resolve(resp);
                });
               });

        default:
            break;
    }
}