---
title: "DVKForm"
metaTitle: "DVKForm component"
metaDescription: "Documentation and examples for the DVKForm component"
---

## Description

DVKForm is a component that generates and manages a form based on a declarative collection of fields.

## Props

Available props for the DVKField Component.

| Name | Type | Default | Description |
|---|---|:---:|---|
| fields * | DVKField[] | | The array of fields to be generated. See below. | 
| defaultValue | DVKObject | {} | The object from which to initially populate the form. Changing this object later on, will not update the form. Please use the `key` prop to signal a form reset. | 
| onSubmit | (obj: DVKObject) => void | () => null | Called on form submit. This can be triggered by `Return` key or a `<button type="submit"/>` provided by `renderActions`.  |
| onChange | (obj: DVKObject) => void | () => null | Called when a change occurs on any field. |
| invalidFields | DVKInvalidFields &#124; null | null | The object used to display errors on the form fields. See [Validation](/validation) for more details. |
| ContentWrapper | ComponentType | React.Fragment | The component type with which the form content will be wrapped. Useful when integrating the DVKForm in cards or modals. |
| ActionsWrapper | ComponentType | React.Fragment | The component type with which the form actions will be wrapped. Useful when integrating the DVKForm in cards or modals. This effect can also be achieved using just `renderActions`. |
| renderActions | (formId: string) => ReactElement &#124; null | null | The render function returning the form actions. A form id is provided as a param to identify forms in nested scenarios. |
| bottomContent | node |  | The content inserted inside the form, **after** the fields. |
| children | node | | The content inserted inside the form, **before** the fields. | 
| className | string | | The css class prop passed to the `form` node. | 
| InputModal | ComponentType | React.Fragment | 🔨 Used to avoid circular dependencies. Planned for refactoring. | 

## DVKField

DVKField is the field object from which DVKForm builds each form field. 

WIP
