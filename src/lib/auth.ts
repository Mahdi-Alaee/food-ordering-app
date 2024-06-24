import { cookies } from "next/headers";

export function saveCookie(
  cookieName: string,
  cookieValue: string,
  exDay: number = 10
) {
  const expiredDay = new Date();
  expiredDay.setTime(expiredDay.getTime() + exDay * 24 * 60 * 60 * 1000); // {exDay} rooz bad
  document.cookie = `${cookieName}=${cookieValue};path=/;expires=${expiredDay}`;
}

// export function getCookie(name:string) {
//     try {
//         const coockiesArray = document.cookie.split(';');
//         const cookiesFinalArray: string[] = [];

//         coockiesArray.forEach(cookie => cookiesFinalArray.push(cookie.split('=')));

//         const token = cookiesFinalArray.find(cookie => cookie[0].trim() === name)[1];

//         return token;
//     } catch (err) {
//         return false
//     }
// }

export function getSession() {
  const cookies = document.cookie.split(";");
  const cookiesArray: string[][] = [];
  cookies.forEach((cookie) => {
    const splitedCookie = cookie.split("=");
    cookiesArray.push(splitedCookie);
  });

  let session: string = "";
  cookiesArray.forEach((cookie) => {
    if (cookie[0].trim() === "session") {
      session = cookie[1];
    }
  });
  return session;
}

export const loginHandler = async (email: string, password: string) => {
  const output = { user: null, message: "" };
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();

      if (data.user) {
        saveCookie("session", data.token, 10);
      }

      output.user = data.user;
      output.message = data.message;
    }
  } catch (err) {
    console.log(err);
  }
  return output;
};

export async function loadUser() {
  const session = getSession();

  if (session) {
    const res = await fetch("/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    return await res.json();
  } else {
    return false;
  }
}

export async function logoutHandler() {}
