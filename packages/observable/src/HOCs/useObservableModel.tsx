import * as React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import * as Models from '@art-forms/models';


const filterObservableEntries = (entry: any[]) => Models.isObservable(entry[1]);
const mapEntriesToObservable = ([key, value]: [string, Models.IObservable]) => [key, Models.getObservable(value)] as [string, Models.IObservable];

export function useObservableModel<T>(WrappedComponent: any) {
    class Enhance extends React.Component<T> {
        subscriptions: Models.IDisposable[] = [];

        constructor(props: T) {
            super(props);
            this.state = {};
            this.subscribeOnObservable();
        }

        componentWillUnmount() {
            super.componentWillUnmount && super.componentWillUnmount.call(this);
            this.subscriptions.forEach(x => setTimeout(() => x.dispose()));
        }

        subscribeOnObservable() {
            Object.entries(this.props)
                .filter(filterObservableEntries)
                .map(mapEntriesToObservable)
                .forEach(([key, value]) => {
                    const observable = Models.getObservable(value);
                    if (observable) {
                        this.subscriptions.push(observable.subscribe((obj: any) => {
                            this.setState({ [key]: obj });
                        }));
                    }
                });
        }

        getProps() {
            return { ...this.props, ...this.state };
        }

        render() {
            return <WrappedComponent {...this.getProps()} />
        }
    }
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
}

export default useObservableModel;