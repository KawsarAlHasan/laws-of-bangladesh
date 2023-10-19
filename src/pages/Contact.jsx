import React from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_p1v12ya",
        "template_wipafiv",
        e.target,
        "Kf9t6D5m9U8K-RG8x"
      )
      .then(
        (result) => {
          toast("Success your Message!");
          window.location.reload(false);
        },
        (error) => {
          toast.error("Oh no! not success your message");
          window.location.reload(false);
        }
      );
  };
  return (
    <div className="mx-2">
      <h2 className="text-center text-3xl my-4">Contact Us/Feedback</h2>
      <p className="text-lg">
        Legislative and Parliamentary Affairs Division <br />
        Ministry of Law, Justice and Parliamentary Affairs <br />
        Bangladesh Secretariat, Dhaka - 1000, Bangladesh. <br />
        Phone : 88-02-9545011 <br />
        Email : ap@legislativediv.gov.bd
      </p>
      <h2 className="text-center text-3xl my-4">Feedback/Suggestion</h2>
      <div className=" container w-50 mb-3">
        <form onSubmit={sendEmail}>
          <label class="label">
            <span class="label-text font-bold">Your Name:</span>
          </label>
          <input
            type="text"
            name="eName"
            className="input input-bordered input-info w-full input-sm max-w-xl mb-1 mt-[-10px]"
            placeholder="Your Name"
            required
          />
          <br />
          <label class="label">
            <span class="label-text font-bold">Your Email:</span>
          </label>
          <input
            type="email"
            name="eEmail"
            placeholder="Your Email"
            class="input input-bordered input-info w-full input-sm max-w-xl mb-1 mt-[-7px]"
            required
          />
          <br />
          <label class="label">
            <span class="label-text font-bold">Your Phone Number:</span>
          </label>
          <input
            className="input input-bordered input-info w-full input-sm max-w-xl mb-1 mt-[-7px]"
            placeholder="Your Phone Number"
            type="number"
            name="ePhone"
            required
          />
          <br />
          <label class="label">
            <span class="label-text font-bold">Your Text:</span>
          </label>
          <textarea
            className="textarea textarea-info w-full input-sm max-w-xl mb-1 mt-[-7px]"
            placeholder="Start writing..."
            name="message"
            required
          />{" "}
          <br />
          <input
            type="submit"
            className="btn btn-info w-full input-sm max-w-xl"
            value="Please Submit"
          />
        </form>
      </div>
    </div>
  );
}

export default Contact;
