import {
  ModalComponent,
  ModalInput,
  ModalTextDisplay,
  ModalChannelSelect,
  ModalCheckboxGroup,
  ModalChoice,
} from "@spraxium/components";

@ModalComponent({
  id: "repeat-message-modal",
  title: "Start Reoccuring Message",
})
export class RepeatMessageModal {
  @ModalInput({
    label: "Title and Description",
    placeholder: "The contents of the message. The first line will be used as the title of the message",
    style: "paragraph",
  })
  description_field!: string;

  @ModalInput({
    label: "Repeat Count",
    placeholder: "Number of times to repeat. Leave blank to repeat indefinitely",
    required: false,
  })
  repeat_count!: string;

  @ModalCheckboxGroup({ label: "Repeat Days", minValues: 1})
  @ModalChoice({ label: "Sunday", value: "sunday" })
  @ModalChoice({ label: "Monday", value: "monday" })
  @ModalChoice({ label: "Tuesday", value: "tuesday" })
  @ModalChoice({ label: "Wednesday", value: "wednesday" })
  @ModalChoice({ label: "Thursday", value: "thursday" })
  @ModalChoice({ label: "Friday", value: "friday" })
  @ModalChoice({ label: "Saturday", value: "saturday" })
  days!: string[];

  @ModalInput({
    label: "Start Datetime",
    placeholder: "Date and time after which these messages will be posted",
    minLength: 3,
    maxLength: 50,
    style: "short",
  })
  title_field!: string;

  @ModalChannelSelect({
    label: "Channel",
    description: "The channel to post the message to"
  })
  channel_id!: string;
}