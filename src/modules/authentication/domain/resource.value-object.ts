import { SystemResourcesProps } from '../../@shared/interfaces'
import ValueObject from '../../@shared/domain/value-object/value-object.interface'
import msgpack5 from 'msgpack5'
export default class Resource implements ValueObject {
  private _systemResources: string

  constructor(actions: SystemResourcesProps) {
    this._systemResources = msgpack5().encode(actions).toString('hex')
  }

  get resourcesEncoded() {
    return this._systemResources
  }

  get resourcesDecoded() {
    return msgpack5().decode(Buffer.from(this._systemResources, 'hex'))
  }
}
