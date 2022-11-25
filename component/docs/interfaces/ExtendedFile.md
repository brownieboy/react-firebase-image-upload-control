[react-firebase-image-upload-control](../README.md) / [Exports](../modules.md) / ExtendedFile

# Interface: ExtendedFile

## Hierarchy

- `File`

  ↳ **`ExtendedFile`**

## Table of contents

### Constructors

- [constructor](ExtendedFile.md#constructor)

### Properties

- [downloadUrl](ExtendedFile.md#downloadurl)
- [lastModified](ExtendedFile.md#lastmodified)
- [name](ExtendedFile.md#name)
- [prototype](ExtendedFile.md#prototype)
- [size](ExtendedFile.md#size)
- [type](ExtendedFile.md#type)
- [webkitRelativePath](ExtendedFile.md#webkitrelativepath)

### Methods

- [arrayBuffer](ExtendedFile.md#arraybuffer)
- [slice](ExtendedFile.md#slice)
- [stream](ExtendedFile.md#stream)
- [text](ExtendedFile.md#text)

## Constructors

### constructor

• **new ExtendedFile**(`blobParts?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blobParts?` | `BlobPart`[] |
| `options?` | `BlobPropertyBag` |

#### Inherited from

File.constructor

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2573

## Properties

### downloadUrl

• **downloadUrl**: `string`

The URL to the file that you just uploaded

#### Defined in

[component/src/FirebaseUploader.tsx:34](https://github.com/brownieboy/react-firebase-image-upload-control/blob/8eb1250/component/src/FirebaseUploader.tsx#L34)

___

### lastModified

• `Readonly` **lastModified**: `number`

#### Inherited from

File.lastModified

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:5335

___

### name

• `Readonly` **name**: `string`

#### Inherited from

File.name

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:5336

___

### prototype

• **prototype**: `Blob`

#### Inherited from

File.prototype

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2572

___

### size

• `Readonly` **size**: `number`

#### Inherited from

File.size

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2563

___

### type

• `Readonly` **type**: `string`

#### Inherited from

File.type

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2564

___

### webkitRelativePath

• `Readonly` **webkitRelativePath**: `string`

#### Inherited from

File.webkitRelativePath

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:5337

## Methods

### arrayBuffer

▸ **arrayBuffer**(): `Promise`<`ArrayBuffer`\>

#### Returns

`Promise`<`ArrayBuffer`\>

#### Inherited from

File.arrayBuffer

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2565

___

### slice

▸ **slice**(`start?`, `end?`, `contentType?`): `Blob`

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |
| `contentType?` | `string` |

#### Returns

`Blob`

#### Inherited from

File.slice

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2566

___

### stream

▸ **stream**(): `ReadableStream`<`Uint8Array`\>

#### Returns

`ReadableStream`<`Uint8Array`\>

#### Inherited from

File.stream

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2567

___

### text

▸ **text**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

File.text

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:2568
