import {Observable, Subject,  UnaryFunction,takeUntil} from "rxjs";
import {ChangeDetectorRef, inject, ViewRef} from "@angular/core";

export function autoUnsubscribe<T>():UnaryFunction<Observable<T>,Observable<T>> {
  const viewRef=inject(ChangeDetectorRef) as ViewRef
  const stop$=new Subject<void>();

  viewRef.onDestroy(()=>stop$.next())
  return (observable:Observable<T>) =>observable.pipe(takeUntil(stop$))
}
