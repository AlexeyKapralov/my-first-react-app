import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType
}
type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

export const UsersSearchForm:React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter:FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <>
        <Formik
            //для возможности обновления значений пропсов после их обновления
            enableReinitialize
            initialValues={{term: props.filter.term, friend: String(props.filter.friend) as "true" | "false" | "null"}}
            validate={values => {
                const errors: any = {};
                return errors;
            }}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="term" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </>
})