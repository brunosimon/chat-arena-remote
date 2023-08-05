import { create } from 'zustand'
import deepmerge from 'deepmerge'

export default create((set) =>
{
    return {
        set: (value) =>
        {
            set((state) =>
            {
                return deepmerge(
                    state,
                    value,
                    {
                        // Prevent merging arrays
                        arrayMerge: (destinationArray, sourceArray, options) =>
                        {
                            return sourceArray
                        }
                    }
                )
            })
        },
    }
})