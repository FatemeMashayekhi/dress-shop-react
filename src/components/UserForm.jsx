import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { DataContext } from "../DataContext";

export default function UserForm() {
  const { showForm } = useContext(DataContext);
  return (
    <>
      {showForm && (
        <Formik
          initialValues={{ email: "", name: "", address: "" }}
          onSubmit={() => {
            alert("Will be sent");
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .matches(
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                "email is not correct"
              )
              .required("email is required"),
            name: Yup.string()
              .required("name is required")
              .matches(/^[^0-9]*$/, "name doesn't contain number"),

            address: Yup.string().required("address is required"),
          })}
          validateOnChange={false}
        >
          {({ errors }) => (
            <Form className="flex flex-col gap-y-1">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                className="p-2 border-[1px] border-black mb-3"
              />
              <span className="text-sm text-red-500">{errors.email}</span>

              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="p-2 border-[1px] border-black mb-3"
              />
              <span className="text-sm text-red-500">{errors.name}</span>

              <label htmlFor="address">Address</label>
              <Field
                name="address"
                className="p-2 border-[1px] border-black mb-3"
              />
              <span className="text-sm text-red-500">{errors.address}</span>

              <button type="submit" className="bg-[#f0c041] p-4 text-sm">
                Checkout
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
