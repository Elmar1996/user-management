import * as Yup from 'yup';

export const useUservalidationSchema = () =>
    Yup.object().shape({
        name: Yup.string()
        .trim()
        .min(3, "Must be minimum 3 symbols")
        .max(25, "Must be maxumum 25 symbols")
        .matches(/^[A-ZƏÜÖİĞÇŞQI][a-zəüöiğçjşı]{2,25}$/, ".,? / @ _-% $ and numbers restricted: only first letter must be capitalize")
        .required("Name required"),

    username: Yup.string()
        .trim()
        .min(3, "Must be minimum 3 symbols")
        .max(25, "Must be maxumum 25 symbols")
        .matches(/^[A-ZƏÜÖİĞÇŞQI][a-zəüöiğçjşı]{2,25}$/, ".,? / @ _-% $ and numbers restricted: only first letter must be capitalize")
        .required('Username required'),

    email: Yup.string().email("Email format: example@gmail.com").required('Email required'),

    phone: Yup.string().required("Phone number required"),
    });
