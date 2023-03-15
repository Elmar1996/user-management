import * as Yup from 'yup';

export const useCategoryvalidationSchema = (t) =>
    Yup.object().shape({
        name: Yup.string().trim().max(50, t('categoriesAdmin:namesMaxValidation')).required(t('Required')),
        color: Yup.string().required(t('Required')),
    });
