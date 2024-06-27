import { z } from 'zod';

const validateCI = (ci) => {
    if (!/^\d{10}$/.test(ci)) {
        return false;
    }

    const provinceCode = parseInt(ci.slice(0, 2), 10);
    if (provinceCode < 1 || provinceCode > 24) {
        return false;
    }

    const thirdDigit = parseInt(ci[2], 10);
    if (thirdDigit < 0 || thirdDigit > 6) {
        return false;
    }

    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let total = 0;

    for (let i = 0; i < coefficients.length; i++) {
        let value = coefficients[i] * parseInt(ci[i], 10);
        if (value >= 10) {
            value -= 9;
        }
        total += value;
    }

    const verifierDigit = parseInt(ci[9], 10);
    const calculatedVerifier = (10 - (total % 10)) % 10;

    return verifierDigit === calculatedVerifier;
};

const validateRUC = (ruc) => {
    if (!/^\d{13}$/.test(ruc)) {
        return false;
    }

    const provinceCode = parseInt(ruc.slice(0, 2), 10);
    if (provinceCode < 1 || provinceCode > 24) {
        return false;
    }

    const thirdDigit = parseInt(ruc[2], 10);
    if (thirdDigit < 0 || thirdDigit > 6 && thirdDigit !== 9) {
        return false;
    }

    const establishmentCode = ruc.slice(10, 13);
    if (establishmentCode === '000') {
        return false;
    }

    const coefficients = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    let total = 0;

    for (let i = 0; i < coefficients.length; i++) {
        total += coefficients[i] * parseInt(ruc[i], 10);
    }

    const verifierDigit = parseInt(ruc[9], 10);
    const calculatedVerifier = 11 - (total % 11);
    const validVerifier = calculatedVerifier === 11 ? 0 : calculatedVerifier;

    return verifierDigit === validVerifier;
};

const isAdult = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        return (age - 1) < 18 ? false : true;
    }
    return age < 18 ? false : true;
};

export const userSchema = z.object({

    name: z.string().min(3, {
        message: 'El nombre debe tener más de 3 caracteres'
    }),

    lastName: z.string().min(3, {
        message: 'El apellido debe tener más de 3 caracteres'
    }),

    ci: z.string().refine(validateCI, {
        message: 'el número de cédula no es válido'
    }),

    dateOfBirth: z.string().refine(isAdult, {
        message: 'Debes ser mayor de 18 años'
    }),

    gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: 'Debe seleccionar una opción' })
    }),

    hasRuc: z.enum(["true", "false"], {
        errorMap: () => ({ message: 'Debe seleccionar una opción' })
    }),

    rucNumber: z.string().optional().refine(value => value ? validateRUC(value) : true, {
        message: 'el número de RUC no es válido'
    }),

    hasFarm: z.enum(["true", "false"], {
        errorMap: () => ({ message: 'Debe seleccionar una opción' })
    }),

    farmHa: z.string().optional(),

    farmName: z.string().optional(),

    hasWorkers: z.enum(["true", "false"], {
        errorMap: () => ({ message: 'Debe seleccionar una opción' })
    }),

    totalWorkers: z.string().optional(),

    menWorkers: z.string().optional(),

    womanWorkers: z.string().optional(),

    over18Workers: z.string().optional(),

    under18Workers: z.string().optional(),

    minorWorkersOcuppacion: z.string().optional(),

    hasPregnandWorkers: z.string().optional(),

    pregnandWorkers: z.string().optional(),

    pregnandWorkersOcuppacion: z.string().optional(),

    family: z.array(
        z.object({
            name: z.string().min(3, { message: 'El nombre del miembro de la familia debe tener al menos 3 caracteres' }),
            lastName: z.string().min(3, { message: 'El apellido del miembro de la familia debe tener al menos 3 caracteres' }),
            ci: z.string().min(validateCI, { message: 'La cédula del miembro de la familia no es valida' }),
        })
    ).min(1, { message: 'Debe agregar al menos un miembro de la familia' }),

    crops: z.array(z.object({
        crop: z.string()
    })).optional(),

}).refine((data) => {
    if (data.hasFarm === "false") {
        data.farmHa = '';
        data.farmName = '';
        data.crops = [];
        return !data.farmHa && !data.farmName && (!data.crops || data.crops.length === 0);
    } else if (data.hasFarm === "true") {
        return !!data.farmHa && !!data.farmName && data.crops.length > 0;
    }
    return true;
}, {
    message: 'Si tiene una finca, debe especificar las hectáreas, el nombre de la finca y al menos un cultivo'
}).refine((data) => {
    if (data.hasWorkers === "false") {
        data.totalWorkers = '';
        data.menWorkers = '';
        data.womanWorkers = '';
        data.over18Workers = '';
        data.under18Workers = '';
        data.pregnandWorkers = '';
        data.pregnandWorkersOcuppacion = '';
        return !data.totalWorkers && !data.menWorkers && !data.womanWorkers &&
            !data.over18Workers && !data.under18Workers &&
            !data.pregnandWorkers && !data.pregnandWorkersOcuppacion;
    }
    return true;
}).refine((data) => {
    if (data.hasWorkers === "true") {
        const total = parseInt(data.totalWorkers ?? '0', 10);
        const men = parseInt(data.menWorkers ?? '0', 10);
        const women = parseInt(data.womanWorkers ?? '0', 10);
        return men + women === total;
    }
    return true;
}, {
    message: 'La suma de trabajadores hombre y mujeres debe ser igual a numero de trabajadores'
}).refine((data) => {
    if (data.hasWorkers === "true") {
        const total = parseInt(data.totalWorkers ?? '0', 10);
        const over18 = parseInt(data.over18Workers ?? '0', 10);
        const under18 = parseInt(data.under18Workers ?? '0', 10);
        return over18 + under18 === total;
    }
    return true;
}, {
    message: "La suma de los trabajadores mayores y menores debe ser igual a numero de trabajadores"
}).refine((data) => {
    if (data.hasWorkers === "true") {
        const pregnand = parseInt(data.pregnandWorkers ?? '0', 10);
        const women = parseInt(data.womanWorkers ?? '0', 10);
        return pregnand <= women;
    }
    return true;
}, {
    message: "El numero de mujeres embarazadas debe ser menor o igual al numero de mujeres trabajadoras "
}).refine((data) => {
    if (data.hasWorkers === "true") {
        const under18 = parseInt(data.under18Workers ?? '0', 10);

        return under18 > 0 ? !!data.minorWorkersOcuppacion : true;
    }
    return true;
}, {
    message: "Ocupación de los trabajadores menores de edad es obligatorio"
}).refine((data) => {
    if (data.hasWorkers === "true") {
        const pregnand = parseInt(data.pregnandWorkers ?? '0', 10);

        return pregnand > 0 ? !!data.pregnandWorkersOcuppacion : true;
    }
    return true;
}, {
    message: "Ocupación de las trabajadoras hembarazadas es obligatorio"
});

export const getErrorMessages = (errors) => {
    const messages = {};
    for (const [key, value] of Object.entries(errors)) {
        if (value?.message) {
            messages[key] = value.message;
        }
    }
    return messages;
};
