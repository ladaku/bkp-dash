import axios from 'axios';
// ---------------------------- Student API ------------------------------------------------- //
// export async function resendEmail(email: string) {
//     try {
//       const res = await axios.post("/auth/register/resend-email/", { email });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// }

export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function postLogin(username: string, password: string) {
  try {
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    const res = await axios.post(
      `${import.meta.env.VITE_URL_API}/v1/auth/signin`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getTagPaging(page: number, size: number) {
  const token = localStorage.getItem('broco');
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL_API}/v1/tag/?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getTagSelect() {
  const token = localStorage.getItem('broco');
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL_API}/v1/tag`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function postTag(name: string) {
  const token = localStorage.getItem('broco');
  const data = {
    tag: {
      name: name
    }
  };
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL_API}/v1/tag`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPostPaging(page: number, size: number) {
  const token = localStorage.getItem('broco');
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL_API}/v1/posts/?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createPost(data: FormData) {
  const token = localStorage.getItem('broco');

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL_API}/v1/posts`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deletePost(id: number) {
  const token = localStorage.getItem('broco');
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_URL_API}/v1/posts/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
