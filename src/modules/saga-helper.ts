import { SagaIterator } from 'redux-saga'
import { call, CallEffect, ForkEffect, takeLatest } from 'redux-saga/effects'
import { Action, ActionCreator } from 'typescript-fsa'

export function delay(msec: number): CallEffect {
  return call(sleep, msec)
}

export function takeLatestFSA<Payload>(
  actionCreator: ActionCreator<Payload>,
  worker: (action: Action<Payload>) => SagaIterator
): ForkEffect {
  return takeLatest(actionCreator.type, worker)
}

function sleep(msec: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, msec))
}
