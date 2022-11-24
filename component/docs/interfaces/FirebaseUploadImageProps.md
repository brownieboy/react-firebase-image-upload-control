[react-firebase-image-upload-control](../README.md) / [Exports](../modules.md) / FirebaseUploadImageProps

# Interface: FirebaseUploadImageProps

## Table of contents

### Properties

- [buttonControl](FirebaseUploadImageProps.md#buttoncontrol)
- [checkboxControl](FirebaseUploadImageProps.md#checkboxcontrol)
- [disabled](FirebaseUploadImageProps.md#disabled)
- [firebaseApp](FirebaseUploadImageProps.md#firebaseapp)
- [multiple](FirebaseUploadImageProps.md#multiple)
- [options](FirebaseUploadImageProps.md#options)
- [progressControl](FirebaseUploadImageProps.md#progresscontrol)
- [removeButtonIcon](FirebaseUploadImageProps.md#removebuttonicon)
- [storageFolder](FirebaseUploadImageProps.md#storagefolder)
- [uploadButtonIcon](FirebaseUploadImageProps.md#uploadbuttonicon)
- [uploadCompleteCallback](FirebaseUploadImageProps.md#uploadcompletecallback)
- [uploadStartCallback](FirebaseUploadImageProps.md#uploadstartcallback)

## Properties

### buttonControl

• `Optional` **buttonControl**: `any`

A React control to display buttons for **Upload all** and **Remove checked files** button.

**`Example`**

`Button`

**`Default`**

If not supplied, plain HTML buttons are used.

#### Defined in

[FirebaseUploader.tsx:140](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L140)

___

### checkboxControl

• `Optional` **checkboxControl**: `any`

A React component function to display checkboxes next to each image preview.  If not supplied, plain HTML checkboxes are used, i.e `<input type="checkbox">`.

**`Example`**

`MyCheckbox`

**`Default`**

If not supplied, plain HTML checkboxes are used, i.e `<input type="checkbox">`.

#### Defined in

[FirebaseUploader.tsx:132](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L132)

___

### disabled

• `Optional` **disabled**: `boolean`

Set to `true` to display the control in a disabled state.

**`Default Value`**

`false`

#### Defined in

[FirebaseUploader.tsx:99](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L99)

___

### firebaseApp

• **firebaseApp**: `FirebaseApp`

A reference to your Firebase app that was initialised with a call such as `firebase.initializeApp(firebaseConfigObj)`

#### Defined in

[FirebaseUploader.tsx:93](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L93)

___

### multiple

• `Optional` **multiple**: `boolean`

Set to `true` to specify the control will accept multiple images.

**`Default Value`**

`false`, the control accepts only one image

#### Defined in

[FirebaseUploader.tsx:103](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L103)

___

### options

• `Optional` **options**: `Object`

Additional styles passed to the control via the `styles` property

#### Type declaration

| Name | Type |
| :------ | :------ |
| `styles?` | { `imgPreview?`: `object` ; `imgPreviewLabel?`: `object` ; `imgPreviewTitle?`: `object` ; `progressControlWrapper?`: `object`  } |
| `styles.imgPreview?` | `object` |
| `styles.imgPreviewLabel?` | `object` |
| `styles.imgPreviewTitle?` | `object` |
| `styles.progressControlWrapper?` | `object` |

#### Defined in

[FirebaseUploader.tsx:105](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L105)

___

### progressControl

• `Optional` **progressControl**: `any`

React component function that you can use to show upload progress as percentage.   The control must take a `value` prop, which is a number between 0 and 100.   In the demo, I use my own component function, which is based on `@mui/material/Checkbox`.  If not specified, the upload percentage will display as plain text.

**`Example`**

`CircularProgressWithLabel`
Note: you're passing the function to create the component, not a component that's already been created.   So its `CircularProgressWithLabel` and _not_ `<CircularProgressWithLabel />`

#### Defined in

[FirebaseUploader.tsx:123](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L123)

___

### removeButtonIcon

• `Optional` **removeButtonIcon**: `any`

A React icon component will be displayed on the **Remove all** button.

**`Example`**

`CloudUpload`

**`Default`**

If prop not supplied then the button will have no icon

#### Defined in

[FirebaseUploader.tsx:156](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L156)

___

### storageFolder

• **storageFolder**: `string`

The target folder in Firebase storage.

#### Defined in

[FirebaseUploader.tsx:95](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L95)

___

### uploadButtonIcon

• `Optional` **uploadButtonIcon**: `any`

A React icon component will be displayed on the **Upload all** button.

**`Example`**

`CloudUpload`

**`Default`**

If prop not supplied then the button will have no icon

#### Defined in

[FirebaseUploader.tsx:148](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L148)

___

### uploadCompleteCallback

• `Optional` **uploadCompleteCallback**: `Function`

Function that is called when all uploads have completed.

#### Defined in

[FirebaseUploader.tsx:166](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L166)

___

### uploadStartCallback

• `Optional` **uploadStartCallback**: `Function`

Function that is called when the Upload button on the control is clicked.

#### Defined in

[FirebaseUploader.tsx:161](https://github.com/brownieboy/react-firebase-image-upload-control/blob/dde4980/component/src/FirebaseUploader.tsx#L161)
