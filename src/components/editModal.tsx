import { useFormik } from "formik"
import * as Yup from 'yup';
import { SeminarType, useSeminars } from "../state/useSeminars";
import { startOfDay, isBefore } from 'date-fns';

type EditModalType = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    editId: number | undefined
}

interface InitialValuesType {
    title: string
    description: string
    date: string
    time: string
    photo: string
}

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(1, 'Title must be at least 1 character')
        .max(40, 'Title cannot exceed 40 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(1, 'Description must be at least 1 character')
        .max(100, 'Description cannot exceed 100 characters'),
    date: Yup.date()
        .required('Date is required')
        .typeError('Please enter a valid date')
        .test('is-not-future', 'Date cannot be in the past', function (value) {
            return value >= startOfDay(new Date());
        }),
    time: Yup.string()
        .required('Time is required')
        .test('is-not-past-time', 'Time cannot be in the past', function (value) {
            const now = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const testDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            return !isBefore(testDate, now);
        }),
    photo: Yup.string()
        .url('Must be a valid URL')
});

export const EditModal = ({ onClose, editId }: EditModalType) => {

    const { update_data } = useSeminars(state => state)

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            photo: ''

        },
        validationSchema: validationSchema,
        onSubmit: (values: InitialValuesType) => {
            if (editId) {
                const up_data: SeminarType = {
                    id: editId, ...values
                }
                update_data(up_data)
                onClose(false)
            }

        }
    })


    return (
        <form onSubmit={formik.handleSubmit} className="p-4 h-full">
            <div className="mb-5 flex relative justify-between">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">New Title: </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="ml-2 block w-[400px] rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500 text-xs absolute bottom-[-15px] right-2">{formik.errors.title}</div>
                ) : null}
            </div>

            <div className="mb-5 flex relative justify-between">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">New Description: </label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="ml-2 block w-[400px] rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-xs absolute bottom-[-15px] right-2">{formik.errors.description}</div>
                ) : null}
            </div>

            <div className="mb-5 flex relative justify-between">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">New Date: </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className="ml-2 block w-[400px] rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formik.touched.date && formik.errors.date ? (
                    <div className="text-red-500 text-xs absolute bottom-[-15px] right-2">{formik.errors.date}</div>
                ) : null}
            </div>

            <div className="mb-4 relative flex justify-between">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">New Time: </label>
                <input
                    id="time"
                    name="time"
                    type="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                    className="ml-2 block w-[400px] rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formik.touched.time && formik.errors.time ? (
                    <div className="text-red-500 text-xs absolute bottom-[-15px] right-2">{formik.errors.time}</div>
                ) : null}
            </div>

            <div className="mb-4 relative flex justify-between">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">New Photo URL: </label>
                <input
                    id="photo"
                    name="photo"
                    type="url"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.photo}
                    className="ml-2 block w-[400px] rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formik.touched.photo && formik.errors.photo ? (
                    <div className="text-red-500 text-xs absolute bottom-[-15px] right-2">{formik.errors.photo}</div>
                ) : null}
            </div>

            <div className="w-full flex justify-end mt-10">
                <button type="submit" className="inline-flex mr-5 justify-center transition-all delay-100 py-2 px-4 text-sm font-medium rounded-md hover:bg-green-700 hover:text-white ">
                    ИЗМЕНИТЬ
                </button>
                <button type="button" onClick={() => onClose(false)} className="inline-flex justify-center transition-all delay-100 py-2 px-4 text-sm font-medium rounded-md  hover:bg-red-700 hover:text-white ">
                    ОТЕНИТЬ
                </button>
            </div>
        </form>
    )
}