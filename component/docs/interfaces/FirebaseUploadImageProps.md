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

### Methods

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

[component/src/FirebaseUploader.tsx:145](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L145)

___

### checkboxControl

• `Optional` **checkboxControl**: `any`

A React component function to display checkboxes next to each image preview.  If not supplied, plain HTML checkboxes are used, i.e `<input type="checkbox">`.

**`Example`**

`MyCheckbox`

**`Default`**

If not supplied, plain HTML checkboxes are used, i.e `<input type="checkbox">`.

#### Defined in

[component/src/FirebaseUploader.tsx:137](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L137)

___

### disabled

• `Optional` **disabled**: `boolean`

Set to `true` to display the control in a disabled state.

**`Default Value`**

`false`

#### Defined in

[component/src/FirebaseUploader.tsx:104](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L104)

___

### firebaseApp

• **firebaseApp**: `FirebaseApp`

A reference to your Firebase app that was initialised with a call such as `firebase.initializeApp(firebaseConfigObj)`

#### Defined in

[component/src/FirebaseUploader.tsx:98](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L98)

___

### multiple

• `Optional` **multiple**: `boolean`

Set to `true` to specify the control will accept multiple images.

**`Default Value`**

`false`, the control accepts only one image

#### Defined in

[component/src/FirebaseUploader.tsx:108](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L108)

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

[component/src/FirebaseUploader.tsx:110](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L110)

___

### progressControl

• `Optional` **progressControl**: `any`

React component function that you can use to show upload progress as percentage.   The control must take a `value` prop, which is a number between 0 and 100.   In the demo, I use my own component function, which is based on `@mui/material/Checkbox`.  If not specified, the upload percentage will display as plain text.

**`Example`**

`CircularProgressWithLabel`
Note: you're passing the function to create the component, not a component that's already been created.   So its `CircularProgressWithLabel` and _not_ `<CircularProgressWithLabel />`

#### Defined in

[component/src/FirebaseUploader.tsx:128](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L128)

___

### removeButtonIcon

• `Optional` **removeButtonIcon**: `any`

A React icon component will be displayed on the **Remove all** button.

**`Example`**

`CloudUpload`

**`Default`**

If prop not supplied then the button will have no icon

#### Defined in

[component/src/FirebaseUploader.tsx:161](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L161)

___

### storageFolder

• **storageFolder**: `string`

The target folder in Firebase storage.

#### Defined in

[component/src/FirebaseUploader.tsx:100](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L100)

___

### uploadButtonIcon

• `Optional` **uploadButtonIcon**: `any`

A React icon component will be displayed on the **Upload all** button.

**`Example`**

`CloudUpload`

**`Default`**

If prop not supplied then the button will have no icon

#### Defined in

[component/src/FirebaseUploader.tsx:153](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L153)

## Methods

### uploadCompleteCallback

▸ `Optional` **uploadCompleteCallback**(`statusObj`): `any`

Function that is called when all uploads have completed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusObj` | `Object` |
| `statusObj.files` | [`ExtendedFile`](ExtendedFile.md)[] |

#### Returns

`any`

The function receives one parameter, which is an object of info on the files that were uploaded.  The object has a `files` property, which is an array of all the files uploaded.  Each member of the `files` array is an object of `File` info, plus a `downloadUrl` property, which you can use to add the uploaded file to an HTML page as an `<img \>` tag.

#### Defined in

[component/src/FirebaseUploader.tsx:168](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L168)

___

### uploadStartCallback

▸ `Optional` **uploadStartCallback**(`fileToStore`): `any`

Function that is called when the Upload button on the control is clicked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileToStore` | `File`[] |

#### Returns

`any`

#### Defined in

[component/src/FirebaseUploader.tsx:163](https://github.com/brownieboy/react-firebase-image-upload-control/blob/872cda7/component/src/FirebaseUploader.tsx#L163)
